"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, CheckCircle2, Loader2, Package, X } from "lucide-react";
import { Suspense } from "react";

interface Product {
  id: string; name: string; description: string | null; priceGhs: number;
  comparePriceGhs: number | null; images: string[]; category: string | null;
  stockQuantity: number | null; slug: string;
}
interface CartItem { product: Product; quantity: number; }
interface SiteInfo { id: string; name: string; primaryColor: string | null; slug: string; }

function CheckoutInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const siteSlug = params.slug as string;
  const preselect = searchParams.get("product");

  const [site, setSite] = useState<SiteInfo | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"shop" | "checkout" | "done">("shop");
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.product.id === product.id);
      if (ex) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  useEffect(() => {
    fetch(`/api/public/site?slug=${siteSlug}`)
      .then(r => r.json())
      .then(d => setSite(d.site))
      .catch(() => {});

    fetch(`/api/public/products?siteId=${siteSlug}&useSiteSlug=true`)
      .then(r => r.json())
      .then(d => {
        const prods = d.products || [];
        setProducts(prods);
        if (preselect) {
          const found = prods.find((p: Product) => p.id === preselect || p.slug === preselect);
          if (found) addToCart(found);
        }
        setLoading(false);
      });
  }, [siteSlug, preselect, addToCart]);

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(i => i.product.id !== productId));
  const updateQty = (productId: string, delta: number) => {
    setCart(prev => prev.map(i => i.product.id === productId
      ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const total = cart.reduce((s, i) => s + i.product.priceGhs * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handleSubmit = async () => {
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/public/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: site?.id,
          items: cart.map(i => ({ productId: i.product.id, quantity: i.quantity })),
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          shippingAddress: form.address,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderNumber(data.orderNumber);
        setStep("done");
        setCart([]);
      } else {
        setError(data.error || "Failed to place order.");
      }
    } catch { setError("Network error. Please try again."); }
    setSubmitting(false);
  };

  const primary = site?.primaryColor || "#7c3aed";
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category).filter(Boolean) as string[]))];
  const filtered = products.filter(p => {
    const matchCat = category === "all" || p.category === category;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 size={32} className="animate-spin text-purple-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50" style={{ "--brand": primary } as React.CSSProperties}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link href={`/s/${siteSlug}`} className="flex items-center gap-2 font-black text-slate-900 hover:opacity-70 transition-opacity">
            <ArrowLeft size={16} className="text-slate-400" />
            {site?.name || "Store"}
          </Link>
          <div className="flex items-center gap-3">
            {step === "shop" && (
              <div className="relative flex-1 sm:w-52">
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-9 pl-3 pr-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-purple-400 bg-slate-50" />
              </div>
            )}
            <button onClick={() => step === "shop" && cartCount > 0 && setStep("checkout")}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ background: cartCount > 0 ? primary : "#f1f5f9", color: cartCount > 0 ? "white" : "#64748b" }}>
              <ShoppingBag size={16} />
              <span className="hidden sm:block">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {step === "done" ? (
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Order Placed!</h1>
          <p className="text-slate-500 mb-2">Order <strong className="text-slate-800">#{orderNumber}</strong> confirmed.</p>
          <p className="text-slate-400 text-sm mb-8">A confirmation has been sent to <strong>{form.email}</strong>. The store owner will contact you shortly.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setStep("shop"); setForm({ name: "", email: "", phone: "", address: "" }); }}
              className="px-5 py-2.5 text-sm font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
              Continue Shopping
            </button>
            <Link href={`/s/${siteSlug}`}
              className="px-5 py-2.5 text-sm font-bold rounded-xl text-white"
              style={{ background: primary }}>
              Back to Site
            </Link>
          </div>
        </div>
      ) : step === "checkout" ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <button onClick={() => setStep("shop")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 font-medium">
            <ArrowLeft size={14} /> Back to shop
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Order form */}
            <div className="lg:col-span-3 space-y-5">
              <h1 className="text-xl font-black text-slate-900">Your Details</h1>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
                {[
                  { key: "name", label: "Full Name *", placeholder: "Kwame Mensah", type: "text" },
                  { key: "email", label: "Email Address *", placeholder: "kwame@example.com", type: "email" },
                  { key: "phone", label: "Phone Number", placeholder: "+233 20 000 0000", type: "tel" },
                  { key: "address", label: "Delivery Address", placeholder: "Street, City, Region", type: "text" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{field.label}</label>
                    <input value={(form as Record<string,string>)[field.key]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      type={field.type} placeholder={field.placeholder}
                      className="w-full h-11 px-4 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-purple-400 bg-slate-50" />
                  </div>
                ))}
              </div>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
              <button onClick={handleSubmit} disabled={submitting}
                className="w-full h-13 py-3.5 rounded-xl text-white font-black text-base transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: primary }}>
                {submitting ? <><Loader2 size={18} className="animate-spin" />Placing Order...</> : `Place Order — GHS ${total.toFixed(2)}`}
              </button>
              <p className="text-xs text-center text-slate-400">The store owner will confirm your order and arrange payment.</p>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-black text-slate-900 mb-4">Order Summary</h2>
              <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 p-4 items-start">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden">
                      {item.product.images[0]
                        ? <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                        : <Package size={20} className="m-auto mt-3 text-slate-300" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{item.product.name}</p>
                      <p className="text-sm text-slate-500">GHS {item.product.priceGhs.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQty(item.product.id, -1)} className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                          <Minus size={11} />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, 1)} className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                          <Plus size={11} />
                        </button>
                        <button onClick={() => removeFromCart(item.product.id)} className="ml-1 text-slate-300 hover:text-red-400 transition-colors">
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-800 flex-shrink-0">
                      GHS {(item.product.priceGhs * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="px-4 py-4 flex items-center justify-between">
                  <span className="font-black text-slate-800">Total</span>
                  <span className="font-black text-xl" style={{ color: primary }}>GHS {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Category filters */}
          {categories.length > 2 && (
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap flex-shrink-0 transition-all border"
                  style={category === cat
                    ? { background: primary, color: "white", borderColor: primary }
                    : { background: "white", color: "#64748b", borderColor: "#e2e8f0" }}>
                  {cat === "all" ? "All Products" : cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="text-slate-400 font-medium">{products.length === 0 ? "No products available yet." : "No products match your search."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(product => {
                const inCart = cart.find(i => i.product.id === product.id);
                return (
                  <div key={product.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-lg transition-all hover:-translate-y-0.5">
                    <div className="aspect-square bg-slate-100 overflow-hidden relative">
                      {product.images[0]
                        ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        : <div className="w-full h-full flex items-center justify-center"><Package size={32} className="text-slate-300" /></div>}
                      {product.comparePriceGhs && product.comparePriceGhs > product.priceGhs && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full">
                          -{Math.round((1 - product.priceGhs / product.comparePriceGhs) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-bold text-slate-900 text-sm leading-tight mb-1 line-clamp-2">{product.name}</p>
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="font-black text-slate-900">GHS {product.priceGhs.toFixed(2)}</span>
                        {product.comparePriceGhs && product.comparePriceGhs > product.priceGhs && (
                          <span className="text-xs text-slate-400 line-through">GHS {product.comparePriceGhs.toFixed(2)}</span>
                        )}
                      </div>
                      {inCart ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(product.id, -1)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 flex-shrink-0">
                            <Minus size={13} />
                          </button>
                          <span className="flex-1 text-center text-sm font-black">{inCart.quantity}</span>
                          <button onClick={() => addToCart(product)} className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: primary }}>
                            <Plus size={13} className="text-white" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(product)}
                          className="w-full h-9 rounded-xl text-xs font-bold transition-all hover:opacity-90 flex items-center justify-center gap-1.5"
                          style={{ background: primary, color: "white" }}>
                          <Plus size={13} /> Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Floating cart bar */}
          {cartCount > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
              <button onClick={() => setStep("checkout")}
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl text-white font-black shadow-2xl hover:opacity-90 transition-all active:scale-95"
                style={{ background: primary }}>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">{cartCount}</span>
                View Cart — GHS {total.toFixed(2)}
                <ShoppingBag size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 size={32} className="animate-spin text-purple-500" /></div>}>
      <CheckoutInner />
    </Suspense>
  );
}
