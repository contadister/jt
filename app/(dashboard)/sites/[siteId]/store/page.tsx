"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Search, Package, ShoppingCart, Trash2, Edit3, Loader2, Eye, EyeOff } from "lucide-react";

interface Product {
  id: string; name: string; priceGhs: number; stockQuantity: number;
  isAvailable: boolean; images: string[]; category: string | null; createdAt: string;
}

interface Order {
  id: string; orderNumber: string; customerName: string; customerEmail: string;
  totalGhs: number; status: string; createdAt: string; orderItems: { name: string; quantity: number }[];
}

const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  PAID: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  PROCESSING: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
  CANCELLED: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  REFUNDED: "bg-red-100 text-red-700",
};

export default function StorePage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", priceGhs: "", stockQuantity: "0", category: "", description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/sites/${siteId}/products`).then((r) => r.json()),
      fetch(`/api/sites/${siteId}/orders`).then((r) => r.json()),
    ]).then(([p, o]) => {
      setProducts(p.products || []);
      setOrders(o.orders || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [siteId]);

  const handleSaveProduct = async () => {
    if (!form.name || !form.priceGhs) return;
    setSaving(true);
    const method = editingProduct ? "PATCH" : "POST";
    const url = editingProduct ? `/api/sites/${siteId}/products/${editingProduct.id}` : `/api/sites/${siteId}/products`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, priceGhs: parseFloat(form.priceGhs), stockQuantity: parseInt(form.stockQuantity) }),
    });
    const data = await res.json();
    if (data.product) {
      if (editingProduct) {
        setProducts((p) => p.map((x) => x.id === editingProduct.id ? data.product : x));
      } else {
        setProducts((p) => [data.product, ...p]);
      }
    }
    setShowProductForm(false);
    setEditingProduct(null);
    setForm({ name: "", priceGhs: "", stockQuantity: "0", category: "", description: "" });
    setSaving(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/sites/${siteId}/products/${id}`, { method: "DELETE" });
    setProducts((p) => p.filter((x) => x.id !== id));
  };

  const handleToggleAvailable = async (product: Product) => {
    await fetch(`/api/sites/${siteId}/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isAvailable: !product.isAvailable }),
    });
    setProducts((p) => p.map((x) => x.id === product.id ? { ...x, isAvailable: !x.isAvailable } : x));
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    await fetch(`/api/sites/${siteId}/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((o) => o.map((x) => x.id === orderId ? { ...x, status } : x));
  };

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const filteredOrders = orders.filter((o) =>
    o.customerName.toLowerCase().includes(search.toLowerCase()) ||
    o.orderNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/sites/${siteId}`} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Store</h1>
          <p className="text-slate-500 text-sm">{products.length} products · {orders.length} orders</p>
        </div>
        {tab === "products" && (
          <button onClick={() => { setShowProductForm(true); setEditingProduct(null); setForm({ name: "", priceGhs: "", stockQuantity: "0", category: "", description: "" }); }}
            className="flex items-center gap-2 bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 transition-all">
            <Plus size={14} /> Add Product
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-6 w-fit">
        {(["products", "orders"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
              tab === t ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}>
            {t === "products" ? <Package size={14} /> : <ShoppingCart size={14} />}
            {t}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={tab === "products" ? "Search products..." : "Search orders..."}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl focus:border-josett-500 focus:outline-none" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-josett-500" /></div>
      ) : tab === "products" ? (
        <>
          {/* Product Form */}
          {showProductForm && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">{editingProduct ? "Edit Product" : "New Product"}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs text-slate-500 mb-1">Product Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-sm focus:border-josett-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Price (GHS) *</label>
                  <input type="number" value={form.priceGhs} onChange={(e) => setForm({ ...form, priceGhs: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-sm focus:border-josett-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Stock Quantity</label>
                  <input type="number" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-sm focus:border-josett-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-sm focus:border-josett-500 focus:outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-slate-500 mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-sm focus:border-josett-500 focus:outline-none resize-none" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={handleSaveProduct} disabled={saving}
                  className="flex items-center gap-2 bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 disabled:opacity-50">
                  {saving ? <Loader2 size={13} className="animate-spin" /> : null} Save
                </button>
                <button onClick={() => setShowProductForm(false)} className="border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold px-4 py-2 rounded-xl text-sm">Cancel</button>
              </div>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No products yet</p>
              <p className="text-sm">Add your first product to start selling</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    {["Product", "Price", "Stock", "Status", ""].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                            {p.images[0] ? <img src={p.images[0]} className="w-full h-full object-cover rounded-lg" alt="" /> : <Package size={14} className="text-slate-400" />}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-slate-900 dark:text-white">{p.name}</p>
                            {p.category && <p className="text-xs text-slate-400">{p.category}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">GHS {p.priceGhs.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{p.stockQuantity}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.isAvailable ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}>
                          {p.isAvailable ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => handleToggleAvailable(p)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded">
                            {p.isAvailable ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button onClick={() => { setEditingProduct(p); setForm({ name: p.name, priceGhs: String(p.priceGhs), stockQuantity: String(p.stockQuantity), category: p.category || "", description: "" }); setShowProductForm(true); }}
                            className="text-slate-400 hover:text-josett-500 p-1 rounded">
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id)} className="text-slate-400 hover:text-red-500 p-1 rounded">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        /* Orders tab */
        filteredOrders.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <ShoppingCart size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-900 dark:text-white text-sm">#{order.orderNumber}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ORDER_STATUS_COLORS[order.status] || ""}`}>{order.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{order.customerName} · {order.customerEmail}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{order.orderItems.map((i) => `${i.name} ×${i.quantity}`).join(", ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-josett-600 dark:text-josett-400">GHS {order.totalGhs.toFixed(2)}</p>
                    <p className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
                    <button key={s} onClick={() => handleUpdateOrderStatus(order.id, s)}
                      className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                        order.status === s
                          ? "bg-josett-600 text-white"
                          : "border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-josett-400 hover:text-josett-500"
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
