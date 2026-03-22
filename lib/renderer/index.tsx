// lib/renderer/index.tsx
// Renders builderJson → beautiful, modern, production-ready static HTML
import type { BuilderJSON, BuilderPage, BuilderSection, BuilderElement } from "@/lib/types/builder";

interface SiteSettings {
  siteName: string;
  primaryColor: string;
  secondaryColor?: string;
  fontFamily?: string;
  logo?: string;
  favicon?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: string;
  whatsappNumber?: string;
}

// ── Escape helpers ────────────────────────────────────────────────────────────
function e(s: unknown): string {
  return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function ea(s: unknown): string {
  return String(s ?? "").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

// ── Colour helpers ────────────────────────────────────────────────────────────
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}
function lighten(hex: string, pct = 0.15): string {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  const lr = Math.min(255, Math.round(r + (255-r)*pct));
  const lg = Math.min(255, Math.round(g + (255-g)*pct));
  const lb = Math.min(255, Math.round(b + (255-b)*pct));
  return `#${lr.toString(16).padStart(2,"0")}${lg.toString(16).padStart(2,"0")}${lb.toString(16).padStart(2,"0")}`;
}

// ── Section ───────────────────────────────────────────────────────────────────
export function renderSection(section: BuilderSection, settings: SiteSettings, siteId: string): string {
  if (section.isVisible === false) return "";
  const s = section.styles || {} as Record<string,unknown>;
  const parts: string[] = [];
  if (s.background) parts.push(`background:${s.background}`);
  else if (s.backgroundColor) parts.push(`background-color:${s.backgroundColor}`);
  if (s.backgroundImage) parts.push(`background-image:url('${ea(s.backgroundImage as string)}');background-size:cover;background-position:center`);
  if (s.paddingTop != null) parts.push(`padding-top:${s.paddingTop}px`);
  if (s.paddingBottom != null) parts.push(`padding-bottom:${s.paddingBottom}px`);
  if (s.paddingLeft != null) parts.push(`padding-left:${s.paddingLeft}px`);
  if (s.paddingRight != null) parts.push(`padding-right:${s.paddingRight}px`);
  if (s.textAlign) parts.push(`text-align:${s.textAlign}`);
  if (s.color) parts.push(`color:${s.color}`);

  const inner = section.elements
    .filter((el) => el.isVisible !== false)
    .map((el) => renderElement(el, settings, siteId))
    .join("\n");

  const maxW = (s.maxWidth as string) || "1200px";
  return `\n<section id="${e(section.id)}" style="${parts.join(";")}">\n  <div style="max-width:${maxW};margin:0 auto;padding:0 clamp(16px,4vw,48px)">\n    ${inner}\n  </div>\n</section>`;
}

// ── Element styles ────────────────────────────────────────────────────────────
function elSt(styles: Record<string,unknown>): string {
  const css: Record<string,string> = {
    color:"color", backgroundColor:"background-color", background:"background",
    fontSize:"font-size", fontWeight:"font-weight", textAlign:"text-align",
    padding:"padding", margin:"margin", borderRadius:"border-radius",
    border:"border", width:"width", height:"height", lineHeight:"line-height",
    letterSpacing:"letter-spacing", maxWidth:"max-width", display:"display",
    justifyContent:"justify-content", alignItems:"align-items", gap:"gap",
    marginTop:"margin-top", marginBottom:"margin-bottom",
    marginLeft:"margin-left", marginRight:"margin-right",
  };
  return Object.entries(styles).filter(([k,v])=>css[k]&&v!=null).map(([k,v])=>`${css[k]}:${v}`).join(";");
}

// ── Main element renderer ─────────────────────────────────────────────────────
function renderElement(el: BuilderElement, st: SiteSettings, siteId: string): string {
  const c = el.content as Record<string,unknown>;
  const xs = elSt(el.styles || {});
  const pc = st.primaryColor || "#6272f1";
  const sc = st.secondaryColor || lighten(pc, 0.2);
  const pcRgb = hexToRgb(pc.startsWith("#") && pc.length >= 7 ? pc : "#6272f1");

  switch (el.type) {

    // ── Heading ──
    case "heading": {
      const tag = (c.level as string) || "h2";
      const text = (c.text as string) || "";
      return `<${tag} style="${xs}">${e(text)}</${tag}>`;
    }

    // ── Text ──
    case "text": {
      const html = (c.html as string) || (c.text as string) || "";
      return `<div style="${xs}">${html}</div>`;
    }

    // ── Image ──
    case "image": {
      const src = (c.src as string) || "";
      const alt = (c.alt as string) || "";
      const caption = c.caption as string | undefined;
      if (!src) return `<div style="height:200px;background:#f1f5f9;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:0.875rem;${xs}">Image placeholder</div>`;
      return `<figure style="margin:0;${xs}"><img src="${ea(src)}" alt="${ea(alt)}" style="width:100%;border-radius:12px;display:block" loading="lazy" />${caption ? `<figcaption style="text-align:center;font-size:0.8rem;color:#94a3b8;margin-top:8px">${e(caption)}</figcaption>` : ""}</figure>`;
    }

    // ── Button ──
    case "button": {
      const label = (c.text as string) || (c.label as string) || "Click here";
      const href = (c.href as string) || (c.url as string) || "#";
      const variant = (c.variant as string) || "primary";
      const isOutline = variant === "outline" || variant === "ghost";
      const btn = isOutline
        ? `border:2px solid ${pc};color:${pc};background:transparent;padding:13px 32px;border-radius:10px;font-weight:700;text-decoration:none;display:inline-block;transition:all 0.2s;font-size:1rem`
        : `background:${pc};color:#fff;padding:14px 32px;border-radius:10px;font-weight:700;text-decoration:none;display:inline-block;transition:all 0.2s;font-size:1rem;box-shadow:0 4px 15px rgba(${pcRgb},0.35)`;
      return `<a href="${ea(href)}" style="${btn};${xs}" onmouseover="this.style.opacity='0.85';this.style.transform='translateY(-1px)'" onmouseout="this.style.opacity='1';this.style.transform='none'">${e(label)}</a>`;
    }

    // ── Divider ──
    case "divider": {
      const color = (c.color as string) || "#e2e8f0";
      return `<hr style="border:none;border-top:1px solid ${color};margin:24px 0;${xs}" />`;
    }

    // ── Spacer ──
    case "spacer": {
      const height = (c.height as number) || 40;
      return `<div style="height:${height}px"></div>`;
    }

    // ── Navigation ──
    case "navigation": {
      const links = (c.links as {label:string;href:string}[]) || [];
      const cta = c.ctaText as string | undefined;
      const logoText = (c.logo as string) || st.siteName;
      const logoSrc = st.logo || "";
      const linksHtml = links.map((l) =>
        `<a href="${ea(l.href)}" style="color:inherit;text-decoration:none;font-weight:600;font-size:0.9rem;padding:6px 14px;border-radius:8px;transition:background 0.15s" onmouseover="this.style.background='rgba(${pcRgb},0.08)'" onmouseout="this.style.background='transparent'">${e(l.label)}</a>`
      ).join("");
      return `
<nav style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;${xs}">
  <div style="font-size:1.2rem;font-weight:900;color:${pc};flex-shrink:0">
    ${logoSrc ? `<img src="${ea(logoSrc)}" alt="${ea(logoText)}" style="height:40px;object-fit:contain" />` : e(logoText)}
  </div>
  <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap">${linksHtml}</div>
  ${cta ? `<a href="#contact" style="background:${pc};color:#fff;padding:9px 22px;border-radius:10px;font-weight:700;text-decoration:none;font-size:0.875rem;flex-shrink:0;box-shadow:0 2px 8px rgba(${pcRgb},0.3)">${e(cta)}</a>` : ""}
</nav>`;
    }

    // ── Hero ──
    case "hero": {
      const title = (c.title as string) || "";
      const subtitle = (c.subtitle as string) || "";
      const btn = (c.buttonLabel as string) || (c.ctaText as string) || "";
      const btnHref = (c.buttonHref as string) || (c.ctaHref as string) || "#contact";
      const bgImg = c.backgroundImage as string | undefined;
      const bgStyle = bgImg
        ? `background:url('${ea(bgImg)}') center/cover no-repeat;`
        : `background:linear-gradient(135deg,${pc} 0%,${lighten(pc,-0.1)} 40%,${sc} 100%);`;
      const textColor = bgImg ? "#fff" : "#fff";
      return `
<div style="${bgStyle}padding:clamp(80px,12vw,140px) 20px;text-align:center;position:relative;overflow:hidden;${xs}">
  ${bgImg ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,0.5)"></div>` : `<div style="position:absolute;inset:0;background:radial-gradient(circle at 70% 50%,rgba(255,255,255,0.12) 0%,transparent 60%)"></div>`}
  <div style="position:relative;z-index:1;max-width:760px;margin:0 auto">
    ${title ? `<h1 style="font-size:clamp(2.2rem,6vw,4.5rem);font-weight:900;color:${textColor};margin-bottom:20px;line-height:1.1;letter-spacing:-0.02em">${e(title)}</h1>` : ""}
    ${subtitle ? `<p style="font-size:clamp(1rem,2.5vw,1.3rem);color:rgba(255,255,255,0.88);margin-bottom:40px;line-height:1.7;max-width:600px;margin-left:auto;margin-right:auto">${e(subtitle)}</p>` : ""}
    ${btn ? `<a href="${ea(btnHref)}" style="background:#fff;color:${pc};padding:16px 40px;border-radius:12px;font-weight:800;text-decoration:none;font-size:1.1rem;box-shadow:0 8px 30px rgba(0,0,0,0.2);display:inline-block;transition:transform 0.2s" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">${e(btn)}</a>` : ""}
  </div>
</div>`;
    }

    // ── Stats Counter ──
    case "stats-counter": {
      const stats = (c.stats as {number?:string;value?:string;label:string}[]) || [];
      const items = stats.map((s) => {
        const val = (s.number || s.value || "").toString();
        return `<div style="text-align:center;padding:20px 28px">
  <div style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:${pc};line-height:1;margin-bottom:6px">${e(val)}</div>
  <div style="font-size:0.85rem;font-weight:600;opacity:0.75;text-transform:uppercase;letter-spacing:0.05em">${e(s.label)}</div>
</div>`;
      }).join("");
      return `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;${xs}">${items}</div>`;
    }

    // ── Testimonial ──
    case "testimonial": {
      const quote = (c.quote as string) || "";
      const author = (c.author as string) || "";
      const role = (c.role as string) || "";
      const avatar = c.avatar as string | undefined;
      return `
<div style="background:rgba(${pcRgb},0.04);border:1px solid rgba(${pcRgb},0.12);border-radius:20px;padding:40px;text-align:center;position:relative;${xs}">
  <div style="font-size:4rem;color:${pc};line-height:0.8;margin-bottom:20px;opacity:0.6">"</div>
  <p style="font-size:1.1rem;line-height:1.8;font-style:italic;margin-bottom:28px;max-width:640px;margin-left:auto;margin-right:auto">${e(quote)}</p>
  <div style="display:flex;align-items:center;justify-content:center;gap:14px">
    ${avatar ? `<img src="${ea(avatar)}" alt="${ea(author)}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:3px solid ${pc}" />` : `<div style="width:52px;height:52px;border-radius:50%;background:${pc};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:1.2rem">${e(author.charAt(0))}</div>`}
    <div style="text-align:left">
      <div style="font-weight:800;font-size:1rem">${e(author)}</div>
      ${role ? `<div style="font-size:0.8rem;opacity:0.6;margin-top:2px">${e(role)}</div>` : ""}
    </div>
  </div>
</div>`;
    }

    // ── Feature Grid ──
    case "feature-grid": {
      const heading = c.heading as string | undefined;
      const features = (c.features as {icon?:string;title:string;desc:string}[]) || [];
      const cards = features.map((f) => `
<div style="padding:28px;border:1px solid #e2e8f0;border-radius:16px;transition:box-shadow 0.2s,transform 0.2s;background:#fff" onmouseover="this.style.boxShadow='0 8px 30px rgba(${pcRgb},0.12)';this.style.transform='translateY(-2px)'" onmouseout="this.style.boxShadow='none';this.style.transform='none'">
  ${f.icon ? `<div style="font-size:2.2rem;margin-bottom:14px">${e(f.icon)}</div>` : `<div style="width:40px;height:4px;background:${pc};border-radius:2px;margin-bottom:14px"></div>`}
  <h3 style="font-weight:800;font-size:1.05rem;margin-bottom:8px;color:#1e293b">${e(f.title)}</h3>
  <p style="font-size:0.875rem;color:#64748b;line-height:1.7;margin:0">${e(f.desc)}</p>
</div>`).join("");
      return `<div style="${xs}">
  ${heading ? `<h2 style="font-weight:900;font-size:clamp(1.5rem,3vw,2rem);text-align:center;margin-bottom:40px">${e(heading)}</h2>` : ""}
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px">${cards}</div>
</div>`;
    }

    // ── Steps Process ──
    case "steps-process": {
      const heading = c.heading as string | undefined;
      const steps = (c.steps as {number:string;title:string;desc:string}[]) || [];
      const stepsHtml = steps.map((s, i) => `
<div style="display:flex;align-items:flex-start;gap:20px;${i < steps.length-1 ? "margin-bottom:32px" : ""}">
  <div style="flex-shrink:0;width:52px;height:52px;border-radius:50%;background:${pc};color:#fff;font-weight:900;font-size:1.3rem;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(${pcRgb},0.35)">${e(s.number)}</div>
  <div style="padding-top:10px">
    <h3 style="font-weight:800;font-size:1.1rem;margin-bottom:6px;color:#1e293b">${e(s.title)}</h3>
    <p style="color:#64748b;line-height:1.7;margin:0;font-size:0.95rem">${e(s.desc)}</p>
  </div>
</div>`).join("\n");
      return `<div style="${xs}">
  ${heading ? `<h2 style="font-weight:900;font-size:clamp(1.5rem,3vw,2rem);text-align:center;margin-bottom:40px">${e(heading)}</h2>` : ""}
  <div style="max-width:600px;margin:0 auto">${stepsHtml}</div>
</div>`;
    }

    // ── Pricing Table ──
    case "pricing-table": {
      const plans = (c.plans as {name:string;price:string;period?:string;features:string[];cta:string;href?:string;highlighted?:boolean}[]) || [];
      const cards = plans.map((p) => {
        const feats = (p.features||[]).map((f) => `<li style="padding:9px 0;border-bottom:1px solid ${p.highlighted ? "rgba(255,255,255,0.15)" : "#f1f5f9"};display:flex;align-items:center;gap:8px;font-size:0.9rem"><span style="color:${p.highlighted?"#fff":pc};font-size:1rem">✓</span> ${e(f)}</li>`).join("");
        const bg = p.highlighted ? `background:linear-gradient(135deg,${pc},${lighten(pc,-0.1)})` : "background:#fff";
        const fg = p.highlighted ? "color:#fff" : "color:#1e293b";
        return `
<div style="${bg};${fg};border-radius:20px;padding:36px;flex:1;min-width:240px;max-width:320px;text-align:center;box-shadow:${p.highlighted?`0 20px 60px rgba(${pcRgb},0.35)`:"0 2px 20px rgba(0,0,0,0.06)"};position:relative;${p.highlighted?"transform:scale(1.04)":""}">
  ${p.highlighted ? `<div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#fff;color:${pc};font-weight:900;font-size:0.7rem;padding:4px 16px;border-radius:20px;letter-spacing:0.05em;text-transform:uppercase">Most Popular</div>` : ""}
  <h3 style="font-weight:800;font-size:1.15rem;margin-bottom:12px">${e(p.name)}</h3>
  <div style="margin-bottom:8px"><span style="font-size:2.8rem;font-weight:900;line-height:1">${e(p.price)}</span>${p.period ? `<span style="font-size:0.85rem;opacity:0.7">${e(p.period)}</span>` : ""}</div>
  <ul style="list-style:none;padding:0;margin:20px 0 28px;text-align:left">${feats}</ul>
  <a href="${ea(p.href||"#contact")}" style="display:block;padding:13px 20px;border-radius:10px;font-weight:800;text-decoration:none;font-size:0.95rem;${p.highlighted?"background:#fff;color:"+pc:"background:"+pc+";color:#fff"};box-shadow:0 4px 12px rgba(0,0,0,0.1)">${e(p.cta)}</a>
</div>`;
      }).join("");
      return `<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;align-items:stretch;${xs}">${cards}</div>`;
    }

    // ── FAQ Accordion ──
    case "faq-accordion": {
      const items = (c.items as {q:string;a:string}[]) || [];
      const faqs = items.map((item, i) => `
<details style="border:1px solid #e2e8f0;border-radius:14px;margin-bottom:10px;overflow:hidden;transition:box-shadow 0.2s" onmouseover="this.style.boxShadow='0 4px 20px rgba(${pcRgb},0.1)'" onmouseout="this.style.boxShadow='none'">
  <summary style="padding:18px 22px;font-weight:700;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-size:0.95rem">
    ${e(item.q)}
    <span style="flex-shrink:0;width:24px;height:24px;border-radius:50%;background:${pc};color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;margin-left:12px">▼</span>
  </summary>
  <div style="padding:16px 22px 20px;border-top:1px solid #f1f5f9;line-height:1.75;color:#475569;font-size:0.9rem">${e(item.a)}</div>
</details>`).join("");
      return `<div style="${xs}">${faqs}</div>`;
    }

    // ── Form ──
    case "form": {
      const fields = (c.fields as {name:string;label:string;type:string;required:boolean}[]) || [];
      const submitLabel = (c.submitText as string) || (c.submitLabel as string) || "Send Message";
      const formId = (c.formId as string) || "contact";
      const successMsg = ea((c.successMessage as string) || "Thanks! We'll get back to you soon.");
      const fieldsHtml = fields.map((f) => {
        const inp = f.type === "textarea"
          ? `<textarea name="${ea(f.name)}" ${f.required?"required":""} rows="4" style="width:100%;padding:12px 16px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:0.95rem;resize:vertical;transition:border-color 0.2s;box-sizing:border-box" onfocus="this.style.borderColor='${pc}'" onblur="this.style.borderColor='#e2e8f0'"></textarea>`
          : `<input type="${ea(f.type||"text")}" name="${ea(f.name)}" ${f.required?"required":""} style="width:100%;padding:12px 16px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:0.95rem;transition:border-color 0.2s;box-sizing:border-box" onfocus="this.style.borderColor='${pc}'" onblur="this.style.borderColor='#e2e8f0'" />`;
        return `<div style="margin-bottom:18px"><label style="display:block;margin-bottom:6px;font-weight:700;font-size:0.85rem;color:#374151">${e(f.label)}${f.required?` <span style="color:#ef4444">*</span>`:""}</label>${inp}</div>`;
      }).join("");
      return `
<form id="frm-${el.id}" data-site-id="${ea(siteId)}" data-form-id="${ea(formId)}" style="${xs}" novalidate>
  ${fieldsHtml}
  <div id="frm-msg-${el.id}" style="display:none;padding:14px;border-radius:10px;margin-bottom:14px;font-size:0.9rem;font-weight:600"></div>
  <button type="submit" id="frm-btn-${el.id}" style="width:100%;background:${pc};color:#fff;padding:15px;border:none;border-radius:10px;font-weight:800;font-size:1rem;cursor:pointer;box-shadow:0 4px 15px rgba(${pcRgb},0.35);transition:opacity 0.2s">${e(submitLabel)}</button>
</form>
<script>
(function(){
  var frm=document.getElementById('frm-${el.id}'),btn=document.getElementById('frm-btn-${el.id}'),msg=document.getElementById('frm-msg-${el.id}');
  frm.addEventListener('submit',async function(ev){
    ev.preventDefault();
    btn.disabled=true;btn.style.opacity='0.6';btn.textContent='Sending…';
    var data=Object.fromEntries(new FormData(frm));
    try{
      var r=await fetch('${ea((process.env.NEXT_PUBLIC_APP_URL||""))}/api/public/forms',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({siteId:'${ea(siteId)}',formId:'${ea(formId)}',...data})});
      if(r.ok){msg.style.display='block';msg.style.background='#f0fdf4';msg.style.color='#166534';msg.textContent='${successMsg}';frm.reset();}
      else throw new Error();
    }catch(err){msg.style.display='block';msg.style.background='#fef2f2';msg.style.color='#991b1b';msg.textContent='Something went wrong. Please try again.';}
    btn.disabled=false;btn.style.opacity='1';btn.textContent='${ea(submitLabel)}';
  });
})();
</script>`;
    }

    // ── Newsletter ──
    case "newsletter-signup": {
      const title = (c.title as string) || "Stay in the loop";
      const placeholder = (c.placeholder as string) || "Enter your email";
      const btnLabel = (c.buttonLabel as string) || "Subscribe";
      return `
<div style="text-align:center;${xs}">
  ${title ? `<h2 style="font-weight:900;font-size:clamp(1.4rem,3vw,2rem);margin-bottom:8px">${e(title)}</h2>` : ""}
  <form id="nl-${el.id}" style="display:flex;gap:8px;max-width:480px;margin:24px auto 0;flex-wrap:wrap">
    <input type="email" name="email" placeholder="${ea(placeholder)}" required style="flex:1;min-width:200px;padding:14px 18px;border:2px solid rgba(255,255,255,0.3);border-radius:10px;font-size:0.95rem;background:rgba(255,255,255,0.15);color:inherit;font-family:inherit" />
    <button type="submit" style="background:#fff;color:${pc};padding:14px 24px;border:none;border-radius:10px;font-weight:800;cursor:pointer;font-size:0.95rem;white-space:nowrap">${e(btnLabel)}</button>
  </form>
  <div id="nl-msg-${el.id}" style="display:none;margin-top:12px;font-size:0.875rem;font-weight:600;opacity:0.9"></div>
</div>
<script>
(function(){
  document.getElementById('nl-${el.id}').addEventListener('submit',async function(ev){
    ev.preventDefault();
    var email=new FormData(this).get('email');
    await fetch('${ea((process.env.NEXT_PUBLIC_APP_URL||""))}/api/public/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({siteId:'${ea(siteId)}',email:email})});
    var m=document.getElementById('nl-msg-${el.id}');m.style.display='block';m.textContent='🎉 Subscribed! Thank you.';this.reset();
  });
})();
</script>`;
    }

    // ── WhatsApp Button ──
    case "whatsapp-button": {
      const number = ((c.number as string) || st.whatsappNumber || "").replace(/\D/g,"");
      const message = encodeURIComponent((c.message as string) || "Hello!");
      const label = (c.label as string) || "Chat on WhatsApp";
      return `
<a href="https://wa.me/${number}?text=${message}" target="_blank" rel="noopener noreferrer"
  style="display:inline-flex;align-items:center;gap:12px;background:#25D366;color:#fff;padding:16px 32px;border-radius:50px;font-weight:800;text-decoration:none;font-size:1.05rem;box-shadow:0 6px 25px rgba(37,211,102,0.4);transition:transform 0.2s,box-shadow 0.2s;${xs}"
  onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 10px 35px rgba(37,211,102,0.5)'"
  onmouseout="this.style.transform='none';this.style.boxShadow='0 6px 25px rgba(37,211,102,0.4)'">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  ${e(label)}
</a>`;
    }

    // ── Image + Text ──
    case "image-text": {
      const heading = (c.heading as string) || "";
      const body = (c.body as string) || "";
      const image = c.image as string | undefined;
      const imageLeft = c.imageLeft !== false;
      const imgEl = image
        ? `<img src="${ea(image)}" alt="${ea(heading)}" style="flex:1;min-width:280px;max-width:480px;border-radius:20px;object-fit:cover;max-height:400px;box-shadow:0 20px 60px rgba(0,0,0,0.12)" loading="lazy" />`
        : `<div style="flex:1;min-width:280px;max-width:480px;height:320px;background:linear-gradient(135deg,${pc}22,${pc}44);border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:4rem">🖼️</div>`;
      return `
<div style="display:flex;flex-wrap:wrap;gap:60px;align-items:center;${xs}">
  ${imageLeft ? imgEl : ""}
  <div style="flex:1;min-width:280px">
    ${heading ? `<h2 style="font-weight:900;font-size:clamp(1.5rem,3vw,2.2rem);margin-bottom:16px;line-height:1.2">${e(heading)}</h2>` : ""}
    ${body ? `<p style="color:#64748b;line-height:1.85;font-size:1rem">${e(body)}</p>` : ""}
  </div>
  ${!imageLeft ? imgEl : ""}
</div>`;
    }

    // ── Gallery ──
    case "gallery": {
      const images = (c.images as {src:string;alt?:string}[]) || [];
      const cols = (c.columns as number) || 3;
      if (!images.length) return `<div style="height:200px;background:#f1f5f9;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:0.875rem;${xs}">Add photos to your gallery in the builder</div>`;
      const items = images.map((img) => `<div style="overflow:hidden;border-radius:12px;aspect-ratio:1"><img src="${ea(img.src)}" alt="${ea(img.alt||"")}" style="width:100%;height:100%;object-fit:cover;transition:transform 0.3s" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" loading="lazy" /></div>`).join("");
      return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:12px;${xs}">${items}</div>`;
    }

    // ── Map ──
    case "map": {
      const address = (c.address as string) || "";
      const zoom = (c.zoom as number) || 15;
      return `<div style="border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.1);${xs}"><iframe src="https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=${zoom}&output=embed" width="100%" height="400" style="border:none;display:block" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
    }

    // ── Footer ──
    case "footer": {
      const text = (c.text as string) || `© ${new Date().getFullYear()} ${st.siteName}`;
      const links = (c.links as {label:string;href:string}[]) || [];
      const linksHtml = links.map((l) => `<a href="${ea(l.href)}" style="color:inherit;opacity:0.6;text-decoration:none;font-size:0.875rem;hover:opacity:1">${e(l.label)}</a>`).join("&ensp;·&ensp;");
      return `<footer style="padding:40px 20px;text-align:center;${xs}">
  ${linksHtml ? `<div style="margin-bottom:12px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap">${linksHtml}</div>` : ""}
  <div style="font-size:0.85rem;opacity:0.6">${e(text)}</div>
</footer>`;
    }

    // ── Testimonial (duplicate key) — already handled ──

    // ── Menu Section ──
    case "menu-section": {
      const title = c.title as string | undefined;
      const items = (c.items as {name:string;description?:string;price:string;image?:string}[]) || [];
      const cards = items.map((item) => `
<div style="display:flex;gap:16px;padding:20px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;transition:box-shadow 0.2s" onmouseover="this.style.boxShadow='0 4px 20px rgba(${pcRgb},0.1)'" onmouseout="this.style.boxShadow='none'">
  ${item.image ? `<img src="${ea(item.image)}" alt="${ea(item.name)}" style="width:88px;height:88px;object-fit:cover;border-radius:12px;flex-shrink:0" />` : ""}
  <div style="flex:1">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
      <h4 style="font-weight:800;font-size:1rem;margin:0 0 4px;color:#1e293b">${e(item.name)}</h4>
      <span style="font-weight:900;color:${pc};white-space:nowrap;font-size:1.05rem">${e(item.price)}</span>
    </div>
    ${item.description ? `<p style="font-size:0.85rem;color:#64748b;line-height:1.5;margin:0">${e(item.description)}</p>` : ""}
  </div>
</div>`).join("");
      return `<div style="${xs}">${title ? `<h2 style="font-weight:900;font-size:1.5rem;margin-bottom:20px">${e(title)}</h2>` : ""}<div style="display:flex;flex-direction:column;gap:12px">${cards}</div></div>`;
    }

    // ── Link in Bio ──
    case "link-in-bio": {
      const links = (c.links as {label:string;url:string}[]) || [];
      const avatar = c.avatar as string | undefined;
      const name = (c.name as string) || st.siteName;
      const bio = c.bio as string | undefined;
      const items = links.map((l) => `<a href="${ea(l.url)}" target="_blank" rel="noopener" style="display:block;padding:16px 24px;background:#fff;border:2px solid #e2e8f0;border-radius:14px;text-decoration:none;color:inherit;font-weight:700;margin-bottom:12px;text-align:center;font-size:1rem;transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.05)" onmouseover="this.style.borderColor='${pc}';this.style.transform='scale(1.02)';this.style.boxShadow='0 6px 20px rgba(${pcRgb},0.15)'" onmouseout="this.style.borderColor='#e2e8f0';this.style.transform='scale(1)';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'">${e(l.label)}</a>`).join("");
      return `<div style="max-width:480px;margin:0 auto;text-align:center;${xs}">
  ${avatar ? `<img src="${ea(avatar)}" alt="${ea(name)}" style="width:90px;height:90px;border-radius:50%;object-fit:cover;margin:0 auto 16px;border:4px solid ${pc}" />` : `<div style="width:80px;height:80px;border-radius:50%;background:${pc};display:flex;align-items:center;justify-content:center;color:#fff;font-size:2rem;font-weight:900;margin:0 auto 16px">${e(name.charAt(0))}</div>`}
  <h2 style="font-weight:900;font-size:1.4rem;margin-bottom:6px">${e(name)}</h2>
  ${bio ? `<p style="font-size:0.9rem;opacity:0.7;margin-bottom:24px;line-height:1.6">${e(bio)}</p>` : ""}
  <div style="text-align:left">${items}</div>
</div>`;
    }

    // ── Team Member ──
    case "team-member": {
      const name = (c.name as string) || "";
      const role = (c.role as string) || "";
      const bio = c.bio as string | undefined;
      const image = (c.image as string) || (c.photo as string) || "";
      return `
<div style="text-align:center;padding:24px;${xs}">
  ${image ? `<img src="${ea(image)}" alt="${ea(name)}" style="width:110px;height:110px;border-radius:50%;object-fit:cover;margin:0 auto 16px;border:4px solid ${pc};box-shadow:0 4px 20px rgba(${pcRgb},0.2)" />` : `<div style="width:110px;height:110px;border-radius:50%;background:${pc};display:flex;align-items:center;justify-content:center;color:#fff;font-size:2.5rem;font-weight:900;margin:0 auto 16px">${e(name.charAt(0))}</div>`}
  <h3 style="font-weight:900;font-size:1.15rem;margin-bottom:4px">${e(name)}</h3>
  ${role ? `<p style="color:${pc};font-weight:700;font-size:0.875rem;margin-bottom:10px">${e(role)}</p>` : ""}
  ${bio ? `<p style="font-size:0.875rem;color:#64748b;line-height:1.7;max-width:280px;margin:0 auto">${e(bio)}</p>` : ""}
</div>`;
    }

    // ── Booking Widget ──
    case "booking-widget": {
      const title = (c.title as string) || "Book an Appointment";
      const subtitle = c.subtitle as string | undefined;
      const bookingUrl = (c.bookingUrl as string) || "#contact";
      return `<div style="text-align:center;${xs}">
  <h2 style="font-weight:900;font-size:clamp(1.4rem,3vw,2rem);margin-bottom:8px">${e(title)}</h2>
  ${subtitle ? `<p style="color:#64748b;margin-bottom:24px">${e(subtitle)}</p>` : ""}
  <a href="${ea(bookingUrl)}" style="display:inline-flex;align-items:center;gap:10px;background:${pc};color:#fff;padding:16px 36px;border-radius:50px;font-weight:800;font-size:1.05rem;text-decoration:none;box-shadow:0 8px 25px rgba(${pcRgb},0.35)">📅 Book Now</a>
</div>`;
    }

    // ── Countdown ──
    case "countdown": {
      const target = (c.targetDate as string) || "";
      const title = c.title as string | undefined;
      return `
<div style="text-align:center;${xs}">
  ${title ? `<h3 style="font-weight:700;margin-bottom:24px">${e(title)}</h3>` : ""}
  <div class="cd" data-target="${ea(target)}" style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap">
    ${["days","hours","mins","secs"].map((u) => `<div style="text-align:center"><div class="cd-${u}" style="font-size:clamp(2.5rem,6vw,4rem);font-weight:900;color:${pc};min-width:80px;background:rgba(${pcRgb},0.08);border-radius:16px;padding:16px 20px;line-height:1">--</div><div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-top:8px;opacity:0.6">${u}</div></div>`).join("")}
  </div>
</div>
<script>
(function(){var el=document.querySelector('.cd[data-target="${ea(target)}"]');if(!el)return;function u(){var diff=new Date('${ea(target)}')-new Date();if(diff<=0)return;var d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);el.querySelector('.cd-days').textContent=String(d).padStart(2,'0');el.querySelector('.cd-hours').textContent=String(h).padStart(2,'0');el.querySelector('.cd-mins').textContent=String(m).padStart(2,'0');el.querySelector('.cd-secs').textContent=String(s).padStart(2,'0');}u();setInterval(u,1000);})();
</script>`;
    }

    // ── Video ──
    case "video": {
      const url = (c.url as string) || "";
      const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
      const ytId = ytMatch?.[1];
      return ytId
        ? `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.15);${xs}"><iframe src="https://www.youtube.com/embed/${ytId}" style="position:absolute;inset:0;width:100%;height:100%;border:none" allowfullscreen loading="lazy"></iframe></div>`
        : `<video src="${ea(url)}" controls style="width:100%;border-radius:16px;${xs}"></video>`;
    }

    // ── Social Links ──
    case "social-links": {
      const links = (c.links as {platform:string;url:string}[]) || [];
      const svgs: Record<string,string> = {
        facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
        instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
        twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
        linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
        youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>',
        whatsapp: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
        tiktok: '<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>',
      };
      const items = links.map((l) => {
        const svg = svgs[l.platform] || svgs.twitter;
        return `<a href="${ea(l.url)}" target="_blank" rel="noopener" aria-label="${ea(l.platform)}" style="width:44px;height:44px;border-radius:12px;background:${pc};color:#fff;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 2px 8px rgba(${pcRgb},0.3)" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 6px 20px rgba(${pcRgb},0.4)'" onmouseout="this.style.transform='none';this.style.boxShadow='0 2px 8px rgba(${pcRgb},0.3)'"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg></a>`;
      }).join("");
      return `<div style="display:flex;flex-wrap:wrap;gap:10px;${xs}">${items}</div>`;
    }

    // ── Business Hours ──
    case "business-hours": {
      const title = (c.title as string) || "Opening Hours";
      const hours = (c.hours as {day:string;time:string}[]) || [];
      const rows = hours.map((h) => `<div style="display:flex;justify-content:space-between;padding:11px 0;border-bottom:1px solid #f1f5f9"><span style="font-weight:600;color:#374151">${e(h.day)}</span><span style="font-weight:800;color:${h.time.toLowerCase().includes("closed")?"#ef4444":pc}">${e(h.time)}</span></div>`).join("");
      return `<div style="max-width:440px;margin:0 auto;${xs}"><h2 style="font-weight:900;font-size:1.4rem;text-align:center;margin-bottom:20px">${e(title)}</h2><div style="background:#fff;border-radius:16px;padding:20px 24px;box-shadow:0 2px 20px rgba(0,0,0,0.06)">${rows}</div></div>`;
    }

    // ── Image Compare ──
    case "image-compare": {
      const before = c.beforeImage as string | undefined;
      const after = c.afterImage as string | undefined;
      const bLabel = (c.beforeLabel as string) || "Before";
      const aLabel = (c.afterLabel as string) || "After";
      return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:800px;margin:0 auto;${xs}">
  <div style="position:relative;border-radius:16px;overflow:hidden">${before?`<img src="${ea(before)}" alt="Before" style="width:100%;height:280px;object-fit:cover;display:block" />`:`<div style="height:280px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;color:#94a3b8">Before</div>`}<div style="position:absolute;bottom:12px;left:12px;background:rgba(0,0,0,0.6);color:#fff;padding:4px 12px;border-radius:20px;font-size:0.75rem;font-weight:700">${e(bLabel)}</div></div>
  <div style="position:relative;border-radius:16px;overflow:hidden">${after?`<img src="${ea(after)}" alt="After" style="width:100%;height:280px;object-fit:cover;display:block" />`:`<div style="height:280px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;color:#94a3b8">After</div>`}<div style="position:absolute;bottom:12px;left:12px;background:${pc};color:#fff;padding:4px 12px;border-radius:20px;font-size:0.75rem;font-weight:700">${e(aLabel)}</div></div>
</div>`;
    }

    // ── Product Card ──
    case "product-card": {
      const name = (c.name as string) || "Product";
      const price = c.price as number | undefined;
      const currency = (c.currency as string) || "GHS";
      const image = c.image as string | undefined;
      const desc = c.description as string | undefined;
      const shopUrl = c.shopUrl as string | undefined;
      return `<div style="max-width:320px;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09);background:#fff;${xs}">
  ${image?`<img src="${ea(image)}" alt="${ea(name)}" style="width:100%;height:220px;object-fit:cover;display:block" />`:`<div style="height:220px;background:linear-gradient(135deg,${pc}22,${pc}44);display:flex;align-items:center;justify-content:center;font-size:3rem">🛍️</div>`}
  <div style="padding:20px">
    <h3 style="font-weight:900;font-size:1.1rem;margin-bottom:6px;color:#1e293b">${e(name)}</h3>
    ${desc?`<p style="font-size:0.875rem;color:#64748b;margin-bottom:14px;line-height:1.6">${e(desc)}</p>`:""}
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span style="font-weight:900;font-size:1.3rem;color:${pc}">${price!==undefined?`${currency} ${price}`:""}</span>
      ${shopUrl?`<a href="${ea(shopUrl)}" style="background:${pc};color:#fff;padding:9px 18px;border-radius:10px;text-decoration:none;font-weight:800;font-size:0.875rem">Buy Now</a>`:""}
    </div>
  </div>
</div>`;
    }

    // ── Blog Preview ──
    case "blog-preview": {
      const title = (c.title as string) || "";
      const posts = (c.posts as {title:string;excerpt?:string;image?:string;date?:string;slug?:string}[]) || [];
      const maxPosts = (c.postsCount as number) || 3;
      const cards = posts.slice(0, maxPosts).map((post) => `<article style="border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 2px 16px rgba(0,0,0,0.07);transition:transform 0.2s,box-shadow 0.2s" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 30px rgba(${pcRgb},0.15)'" onmouseout="this.style.transform='none';this.style.boxShadow='0 2px 16px rgba(0,0,0,0.07)'">
  ${post.image?`<img src="${ea(post.image)}" alt="${ea(post.title)}" style="width:100%;height:180px;object-fit:cover" loading="lazy" />`:""}
  <div style="padding:20px">
    <h3 style="font-weight:800;font-size:1rem;margin-bottom:8px;line-height:1.4;color:#1e293b">${e(post.title)}</h3>
    ${post.excerpt?`<p style="font-size:0.875rem;color:#64748b;margin-bottom:10px;line-height:1.6">${e(post.excerpt)}</p>`:""}
    ${post.date?`<time style="font-size:0.75rem;color:#94a3b8">${e(post.date)}</time>`:""}
  </div>
</article>`).join("");
      if (!cards) return `<div style="text-align:center;color:#94a3b8;padding:40px;${xs}">No posts yet.</div>`;
      return `<div style="${xs}">${title?`<h2 style="font-weight:900;font-size:clamp(1.5rem,3vw,2rem);text-align:center;margin-bottom:32px">${e(title)}</h2>`:""}<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">${cards}</div></div>`;
    }

    // ── Brand Logos ──
    case "brand-logos": {
      const heading = c.heading as string | undefined;
      const logos = (c.logos as {name:string;url?:string}[]) || [];
      const items = logos.map((l) => l.url
        ? `<div style="padding:16px 28px;border:1px solid #e2e8f0;border-radius:14px;background:#fafafa"><img src="${ea(l.url)}" alt="${ea(l.name)}" style="max-height:40px;max-width:120px;object-fit:contain;opacity:0.65;filter:grayscale(1)" /></div>`
        : `<div style="padding:16px 28px;border:1px solid #e2e8f0;border-radius:14px;background:#fafafa;font-weight:800;color:#94a3b8;font-size:0.875rem">${e(l.name)}</div>`
      ).join("");
      return `<div style="${xs}">${heading?`<p style="text-align:center;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#94a3b8;margin-bottom:24px">${e(heading)}</p>`:""}<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center">${items}</div></div>`;
    }

    // ── Pricing Table (already handled above) ──

    // ── Logo ──
    case "logo": {
      const src = (c.src as string) || st.logo || "";
      const width = (c.width as number) || 120;
      return src ? `<img src="${ea(src)}" alt="${ea(st.siteName)}" style="width:${width}px;height:auto;${xs}" />` : `<span style="font-size:1.5rem;font-weight:900;color:${pc};${xs}">${e(st.siteName)}</span>`;
    }

    default:
      return `<!-- ${el.type} not rendered -->`;
  }
}

// ── Global CSS injected into every page ──────────────────────────────────────
const GLOBAL_CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{transition:opacity 0.2s}
details>summary{cursor:pointer}
details>summary::-webkit-details-marker{display:none}
@media(max-width:640px){
  .hide-mobile{display:none!important}
  nav>div:nth-child(2){display:none}
}
`;

// ── Full page HTML ────────────────────────────────────────────────────────────
export function buildPageHtml(
  page: BuilderPage,
  builderJson: BuilderJSON,
  siteId: string,
  adSupportedTier = false,
  siteExtras?: {
    faviconUrl?: string | null;
    logoUrl?: string | null;
    tawkToPropertyId?: string | null;
    featureLiveChat?: boolean;
    whatsappNumber?: string | null;
  }
): string {
  const s = builderJson.siteSettings || {} as SiteSettings;
  const g = builderJson.globalStyles || {} as Record<string,unknown>;
  const pc = s.primaryColor || (g.primaryColor as string) || "#6272f1";
  const font = s.fontFamily || (g.fontFamily as string) || "Inter,system-ui,sans-serif";
  const bg = (g.bodyBackground as string) || "#ffffff";
  const text = (g.textColor as string) || "#1e293b";

  const sectionsHtml = page.sections
    .filter((sec) => sec.isVisible !== false)
    .map((sec) => renderSection(sec, s, siteId))
    .join("\n");

  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
  const adScript = adSupportedTier && pubId ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}" crossorigin="anonymous"></script>` : "";

  const googleFont = font.toLowerCase().includes("inter") ? `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">` : font.toLowerCase().includes("georgia") ? "" : `<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.split(",")[0])}:wght@400;600;700;800;900&display=swap" rel="stylesheet">`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${e(page.seo?.title || s.seoTitle || s.siteName)}</title>
  ${page.seo?.description ? `<meta name="description" content="${ea(page.seo.description)}" />` : s.seoDescription ? `<meta name="description" content="${ea(s.seoDescription)}" />` : ""}
  <meta property="og:title" content="${ea(page.seo?.title || s.seoTitle || s.siteName)}" />
  ${page.seo?.description ? `<meta property="og:description" content="${ea(page.seo.description)}" />` : ""}
  <meta name="theme-color" content="${ea(pc)}" />
  ${siteExtras?.faviconUrl ? `<link rel="icon" href="${ea(siteExtras.faviconUrl)}" />` : ""}
  ${adScript}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ${googleFont}
  <style>
    ${GLOBAL_CSS}
    body{font-family:${font};background:${bg};color:${text}}
    a{color:${pc}}
    ::selection{background:${pc};color:#fff}
    :root{--primary:${pc};--primary-rgb:${hexToRgb(pc.startsWith("#")&&pc.length>=7?pc:"#6272f1")}}
  </style>
</head>
<body>
${sectionsHtml}
${siteExtras?.featureLiveChat && siteExtras?.tawkToPropertyId ? `<script>var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src="https://embed.tawk.to/${siteExtras.tawkToPropertyId}/default";s1.charset="UTF-8";s1.setAttribute("crossorigin","*");s0.parentNode.insertBefore(s1,s0);})();</script>` : ""}
</body>
</html>`;
}
