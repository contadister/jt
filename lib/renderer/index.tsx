// lib/renderer/index.tsx
// Server-side renderer for builder JSON → React elements
// Used by the public site pages at /sites/[slug]

import type {
  BuilderJSON,
  BuilderPage,
  BuilderSection,
  BuilderElement,
} from "@/lib/types/builder";
import type { SiteSettings } from "@/types/site";

// ── Section renderer ──────────────────────────────────────────

export function renderSection(section: BuilderSection, settings: SiteSettings, siteId: string): string {
  if (section.isVisible === false) return "";
  const s = section.styles || {};
  const style = [
    s.backgroundColor ? `background-color:${s.backgroundColor}` : "",
    s.backgroundImage ? `background-image:url('${s.backgroundImage}');background-size:cover;background-position:center` : "",
    s.paddingTop != null ? `padding-top:${s.paddingTop}px` : "",
    s.paddingBottom != null ? `padding-bottom:${s.paddingBottom}px` : "",
    s.paddingLeft != null ? `padding-left:${s.paddingLeft}px` : "",
    s.paddingRight != null ? `padding-right:${s.paddingRight}px` : "",
  ].filter(Boolean).join(";");

  const inner = section.elements
    .filter((el) => el.isVisible !== false)
    .map((el) => renderElement(el, settings, siteId))
    .join("\n");

  const maxW = s.maxWidth || "1200px";

  return `
<section id="${section.id}" style="${style}">
  <div style="max-width:${maxW};margin:0 auto;padding:0 20px">
    ${inner}
  </div>
</section>`;
}

// ── Element renderers ─────────────────────────────────────────

function elStyle(styles: Record<string, unknown>): string {
  const map: Record<string, string> = {
    color: "color", backgroundColor: "background-color", fontSize: "font-size",
    fontWeight: "font-weight", textAlign: "text-align", padding: "padding",
    margin: "margin", borderRadius: "border-radius", border: "border",
    width: "width", height: "height", opacity: "opacity",
    lineHeight: "line-height", letterSpacing: "letter-spacing",
    textDecoration: "text-decoration",
  };
  return Object.entries(styles)
    .filter(([k, v]) => map[k] && v != null)
    .map(([k, v]) => `${map[k]}:${v}`)
    .join(";");
}

function renderElement(el: BuilderElement, settings: SiteSettings, siteId: string): string {
  const c = el.content as Record<string, unknown>;
  const st = elStyle(el.styles || {});

  switch (el.type) {
    case "heading": {
      const tag = (c.level as string) || "h2";
      const text = (c.text as string) || "";
      return `<${tag} style="${st}" class="builder-heading">${escHtml(text)}</${tag}>`;
    }

    case "text": {
      const html = (c.html as string) || (c.text as string) || "";
      // allow safe HTML from builder
      return `<div style="${st}" class="builder-text">${html}</div>`;
    }

    case "image": {
      const src = (c.src as string) || (c.url as string) || "";
      const alt = (c.alt as string) || "";
      return `<img src="${escAttr(src)}" alt="${escAttr(alt)}" style="${st};max-width:100%" loading="lazy" />`;
    }

    case "button": {
      const label = (c.label as string) || (c.text as string) || "Click here";
      const href = (c.href as string) || (c.url as string) || "#";
      const variant = (c.variant as string) || "primary";
      const btnStyle = variant === "outline"
        ? `border:2px solid ${settings.primaryColor};color:${settings.primaryColor};background:transparent;padding:12px 28px;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block`
        : `background:${settings.primaryColor};color:#fff;padding:12px 28px;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block`;
      return `<a href="${escAttr(href)}" style="${btnStyle};${st}" class="builder-btn">${escHtml(label)}</a>`;
    }

    case "divider": {
      const color = (c.color as string) || "#e2e8f0";
      const thickness = (c.thickness as number) || 1;
      return `<hr style="border:none;border-top:${thickness}px solid ${color};${st}" />`;
    }

    case "spacer": {
      const height = (c.height as number) || 40;
      return `<div style="height:${height}px"></div>`;
    }

    case "hero": {
      const title = (c.title as string) || "";
      const subtitle = (c.subtitle as string) || "";
      const btnLabel = (c.buttonLabel as string) || "";
      const btnHref = (c.buttonHref as string) || "#";
      const bgImg = (c.backgroundImage as string) || "";
      const overlay = (c.overlay as boolean) !== false;
      const align = (c.align as string) || "center";
      const heroSt = bgImg
        ? `background:url('${escAttr(bgImg)}') center/cover no-repeat;${st}`
        : `background:linear-gradient(135deg,${settings.primaryColor}22,${settings.secondaryColor || settings.primaryColor}44);${st}`;
      return `
<div style="${heroSt};padding:80px 20px;text-align:${align};position:relative">
  ${bgImg && overlay ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,0.45)"></div>` : ""}
  <div style="position:relative;z-index:1;max-width:800px;margin:0 auto">
    ${title ? `<h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:800;margin-bottom:16px;color:${bgImg ? "#fff" : "inherit"}">${escHtml(title)}</h1>` : ""}
    ${subtitle ? `<p style="font-size:1.2rem;margin-bottom:32px;opacity:0.9;color:${bgImg ? "#fff" : "inherit"}">${escHtml(subtitle)}</p>` : ""}
    ${btnLabel ? `<a href="${escAttr(btnHref)}" style="background:${settings.primaryColor};color:#fff;padding:14px 36px;border-radius:8px;font-weight:700;text-decoration:none;font-size:1.1rem">${escHtml(btnLabel)}</a>` : ""}
  </div>
</div>`;
    }

    case "logo": {
      const src = (c.src as string) || settings.logo || "";
      const width = (c.width as number) || 120;
      return src
        ? `<img src="${escAttr(src)}" alt="${escAttr(settings.siteName)} logo" style="width:${width}px;height:auto" />`
        : `<span style="font-size:1.5rem;font-weight:800;color:${settings.primaryColor}">${escHtml(settings.siteName)}</span>`;
    }

    case "navigation": {
      const links = (c.links as { label: string; href: string }[]) || [];
      const logoSrc = settings.logo || "";
      const linksHtml = links.map((l) =>
        `<a href="${escAttr(l.href)}" style="color:inherit;text-decoration:none;font-weight:500;padding:4px 12px">${escHtml(l.label)}</a>`
      ).join("");
      return `
<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 0;${st}">
  ${logoSrc
    ? `<img src="${escAttr(logoSrc)}" alt="${escAttr(settings.siteName)}" style="height:40px" />`
    : `<span style="font-size:1.25rem;font-weight:800;color:${settings.primaryColor}">${escHtml(settings.siteName)}</span>`
  }
  <div style="display:flex;gap:8px;flex-wrap:wrap">${linksHtml}</div>
</nav>`;
    }

    case "footer": {
      const text = (c.text as string) || `© ${new Date().getFullYear()} ${settings.siteName}`;
      const links = (c.links as { label: string; href: string }[]) || [];
      const linksHtml = links.map((l) =>
        `<a href="${escAttr(l.href)}" style="color:inherit;opacity:0.7;text-decoration:none">${escHtml(l.label)}</a>`
      ).join(" · ");
      return `
<footer style="padding:40px 20px;text-align:center;font-size:0.9rem;opacity:0.8;${st}">
  ${linksHtml ? `<div style="margin-bottom:8px">${linksHtml}</div>` : ""}
  <div>${escHtml(text)}</div>
</footer>`;
    }

    case "social-links": {
      const links = (c.links as { platform: string; url: string }[]) || [];
      const icons: Record<string, string> = {
        facebook: "f", twitter: "t", instagram: "ig", linkedin: "in",
        youtube: "yt", tiktok: "tt", whatsapp: "wa",
      };
      const items = links.map((l) => {
        const label = icons[l.platform] || l.platform;
        return `<a href="${escAttr(l.url)}" target="_blank" rel="noopener noreferrer"
          style="width:40px;height:40px;border-radius:50%;background:${settings.primaryColor};color:#fff;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-weight:700;font-size:0.8rem;margin:4px"
          aria-label="${escAttr(l.platform)}">${label.toUpperCase()}</a>`;
      }).join("");
      return `<div style="display:flex;flex-wrap:wrap;gap:8px;${st}">${items}</div>`;
    }

    case "testimonial": {
      const quote = (c.quote as string) || "";
      const author = (c.author as string) || "";
      const role = (c.role as string) || "";
      const avatar = (c.avatar as string) || "";
      return `
<div style="background:#f8fafc;border-radius:16px;padding:32px;text-align:center;${st}">
  <div style="font-size:3rem;color:${settings.primaryColor};line-height:1;margin-bottom:8px">"</div>
  <p style="font-size:1.1rem;line-height:1.7;font-style:italic;margin-bottom:20px">${escHtml(quote)}</p>
  <div style="display:flex;align-items:center;justify-content:center;gap:12px">
    ${avatar ? `<img src="${escAttr(avatar)}" alt="${escAttr(author)}" style="width:48px;height:48px;border-radius:50%;object-fit:cover" />` : ""}
    <div>
      <p style="font-weight:700">${escHtml(author)}</p>
      ${role ? `<p style="font-size:0.875rem;opacity:0.6">${escHtml(role)}</p>` : ""}
    </div>
  </div>
</div>`;
    }

    case "stats-counter": {
      const stats = (c.stats as { value: string; label: string }[]) || [];
      const items = stats.map((s) => `
<div style="text-align:center;padding:20px">
  <p style="font-size:2.5rem;font-weight:800;color:${settings.primaryColor};margin-bottom:4px">${escHtml(s.value)}</p>
  <p style="font-size:0.9rem;opacity:0.7">${escHtml(s.label)}</p>
</div>`).join("");
      return `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px;${st}">${items}</div>`;
    }

    case "team-member": {
      const name = (c.name as string) || "";
      const roleTitle = (c.role as string) || "";
      const bio = (c.bio as string) || "";
      const photo = (c.photo as string) || "";
      return `
<div style="text-align:center;padding:24px;${st}">
  ${photo ? `<img src="${escAttr(photo)}" alt="${escAttr(name)}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;margin:0 auto 12px" />` : ""}
  <h3 style="font-weight:700;margin-bottom:4px">${escHtml(name)}</h3>
  ${roleTitle ? `<p style="color:${settings.primaryColor};font-size:0.875rem;margin-bottom:8px">${escHtml(roleTitle)}</p>` : ""}
  ${bio ? `<p style="font-size:0.875rem;opacity:0.75;line-height:1.6">${escHtml(bio)}</p>` : ""}
</div>`;
    }

    case "gallery": {
      const images = (c.images as { src: string; alt?: string }[]) || [];
      const cols = (c.columns as number) || 3;
      const items = images.map((img) =>
        `<img src="${escAttr(img.src)}" alt="${escAttr(img.alt || "")}" style="width:100%;height:220px;object-fit:cover;border-radius:8px" loading="lazy" />`
      ).join("");
      return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(${Math.floor(100 / cols) - 2}%,1fr));gap:12px;${st}">${items}</div>`;
    }

    case "video": {
      const url = (c.url as string) || "";
      const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
      const ytId = ytMatch ? ytMatch[1] : null;
      return ytId
        ? `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;${st}">
            <iframe src="https://www.youtube.com/embed/${ytId}" style="position:absolute;inset:0;width:100%;height:100%;border:none" allowfullscreen loading="lazy"></iframe>
           </div>`
        : `<video src="${escAttr(url)}" controls style="width:100%;border-radius:12px;${st}"></video>`;
    }

    case "faq-accordion": {
      const items = (c.items as { question: string; answer: string }[]) || [];
      const faqs = items.map((item, i) => `
<details style="border:1px solid #e2e8f0;border-radius:8px;margin-bottom:8px;overflow:hidden">
  <summary style="padding:16px;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center">
    ${escHtml(item.question)} <span>▼</span>
  </summary>
  <div style="padding:16px;border-top:1px solid #e2e8f0;line-height:1.7">${escHtml(item.answer)}</div>
</details>`).join("");
      return `<div style="${st}">${faqs}</div>`;
    }

    case "pricing-table": {
      const plans = (c.plans as { name: string; price: string; features: string[]; cta: string; href?: string; highlighted?: boolean }[]) || [];
      const cards = plans.map((p) => {
        const feats = (p.features || []).map((f) => `<li style="padding:6px 0;border-bottom:1px solid #f1f5f9">✓ ${escHtml(f)}</li>`).join("");
        const bg = p.highlighted ? settings.primaryColor : "#fff";
        const fg = p.highlighted ? "#fff" : "inherit";
        const border = p.highlighted ? `2px solid ${settings.primaryColor}` : "1px solid #e2e8f0";
        return `
<div style="background:${bg};color:${fg};border:${border};border-radius:16px;padding:32px;flex:1;min-width:240px;max-width:320px;text-align:center">
  <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:8px">${escHtml(p.name)}</h3>
  <p style="font-size:2.5rem;font-weight:800;margin-bottom:20px">${escHtml(p.price)}</p>
  <ul style="list-style:none;padding:0;margin-bottom:24px;text-align:left">${feats}</ul>
  <a href="${escAttr(p.href || "#")}" style="display:block;padding:12px;border-radius:8px;font-weight:700;text-decoration:none;${p.highlighted ? "background:#fff;color:" + settings.primaryColor : "background:" + settings.primaryColor + ";color:#fff"}">${escHtml(p.cta)}</a>
</div>`;
      }).join("");
      return `<div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;${st}">${cards}</div>`;
    }

    case "countdown": {
      const target = (c.targetDate as string) || "";
      const title = (c.title as string) || "";
      return `
<div id="countdown-${el.id}" style="text-align:center;${st}">
  ${title ? `<h3 style="margin-bottom:16px;font-weight:700">${escHtml(title)}</h3>` : ""}
  <div class="countdown-timer" data-target="${escAttr(target)}" style="display:flex;justify-content:center;gap:16px">
    <div><span class="cd-days" style="font-size:3rem;font-weight:800;color:${settings.primaryColor}">--</span><br/><small>Days</small></div>
    <div><span class="cd-hours" style="font-size:3rem;font-weight:800;color:${settings.primaryColor}">--</span><br/><small>Hours</small></div>
    <div><span class="cd-mins" style="font-size:3rem;font-weight:800;color:${settings.primaryColor}">--</span><br/><small>Mins</small></div>
    <div><span class="cd-secs" style="font-size:3rem;font-weight:800;color:${settings.primaryColor}">--</span><br/><small>Secs</small></div>
  </div>
</div>
<script>
(function(){
  const el = document.querySelector('[data-target="${escAttr(target)}"]');
  if (!el) return;
  function update() {
    const diff = new Date('${escAttr(target)}') - new Date();
    if (diff <= 0) return;
    const d = Math.floor(diff/86400000), h = Math.floor((diff%86400000)/3600000),
          m = Math.floor((diff%3600000)/60000), s = Math.floor((diff%60000)/1000);
    el.querySelector('.cd-days').textContent = String(d).padStart(2,'0');
    el.querySelector('.cd-hours').textContent = String(h).padStart(2,'0');
    el.querySelector('.cd-mins').textContent = String(m).padStart(2,'0');
    el.querySelector('.cd-secs').textContent = String(s).padStart(2,'0');
  }
  update(); setInterval(update, 1000);
})();
</script>`;
    }

    case "form": {
      const fields = (c.fields as { name: string; label: string; type: string; required: boolean }[]) || [];
      const submitLabel = (c.submitLabel as string) || "Send";
      const formId = (c.formId as string) || "contact";
      const fieldsHtml = fields.map((f) => `
<div style="margin-bottom:16px">
  <label style="display:block;margin-bottom:6px;font-weight:600;font-size:0.875rem">${escHtml(f.label)}${f.required ? ' <span style="color:red">*</span>' : ""}</label>
  ${f.type === "textarea"
    ? `<textarea name="${escAttr(f.name)}" ${f.required ? "required" : ""} rows="4" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:0.95rem;font-family:inherit;resize:vertical"></textarea>`
    : `<input type="${escAttr(f.type || "text")}" name="${escAttr(f.name)}" ${f.required ? "required" : ""} style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:0.95rem;font-family:inherit" />`
  }
</div>`).join("");
      return `
<form id="form-${el.id}" data-site-id="${escAttr(siteId)}" data-form-id="${escAttr(formId)}" style="${st}">
  ${fieldsHtml}
  <div id="form-msg-${el.id}" style="display:none;padding:12px;border-radius:8px;margin-bottom:12px"></div>
  <button type="submit" style="background:${settings.primaryColor};color:#fff;padding:12px 28px;border:none;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;width:100%">${escHtml(submitLabel)}</button>
</form>
<script>
document.getElementById('form-${el.id}').addEventListener('submit', async function(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));
  const msg = document.getElementById('form-msg-${el.id}');
  const btn = this.querySelector('button[type=submit]');
  btn.disabled = true; btn.textContent = 'Sending...';
  try {
    const r = await fetch('${process.env.NEXT_PUBLIC_APP_URL || ""}/api/public/forms', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({siteId:'${escAttr(siteId)}', formId:'${escAttr(formId)}', ...data})
    });
    if (r.ok) {
      msg.style.display='block'; msg.style.background='#f0fdf4'; msg.style.color='#166534';
      msg.textContent = '${escAttr((c.successMessage as string) || "Message sent! We will get back to you soon.")}';
      this.reset();
    } else { throw new Error(); }
  } catch {
    msg.style.display='block'; msg.style.background='#fef2f2'; msg.style.color='#991b1b';
    msg.textContent = 'Something went wrong. Please try again.';
  }
  btn.disabled = false; btn.textContent = '${escAttr(submitLabel)}';
});
</script>`;
    }

    case "newsletter-signup": {
      const title = (c.title as string) || "Stay in the loop";
      const placeholder = (c.placeholder as string) || "Enter your email";
      const btnLabel = (c.buttonLabel as string) || "Subscribe";
      return `
<div style="text-align:center;padding:40px 20px;${st}">
  ${title ? `<h3 style="margin-bottom:12px;font-weight:700">${escHtml(title)}</h3>` : ""}
  <form id="nl-${el.id}" style="display:flex;gap:8px;max-width:480px;margin:0 auto;flex-wrap:wrap;justify-content:center">
    <input type="email" name="email" placeholder="${escAttr(placeholder)}" required
      style="flex:1;min-width:200px;padding:12px 16px;border:1px solid #e2e8f0;border-radius:8px;font-size:0.95rem" />
    <button type="submit" style="background:${settings.primaryColor};color:#fff;padding:12px 24px;border:none;border-radius:8px;font-weight:700;cursor:pointer">${escHtml(btnLabel)}</button>
  </form>
  <div id="nl-msg-${el.id}" style="display:none;margin-top:12px;font-size:0.875rem;color:green"></div>
</div>
<script>
document.getElementById('nl-${el.id}').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = new FormData(this).get('email');
  await fetch('${process.env.NEXT_PUBLIC_APP_URL || ""}/api/public/newsletter', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({siteId:'${escAttr(siteId)}', email})
  });
  document.getElementById('nl-msg-${el.id}').style.display='block';
  document.getElementById('nl-msg-${el.id}').textContent='Thanks for subscribing!';
  this.reset();
});
</script>`;
    }

    case "map": {
      const address = (c.address as string) || "";
      const zoom = (c.zoom as number) || 15;
      const encoded = encodeURIComponent(address);
      return `
<div style="width:100%;height:400px;border-radius:12px;overflow:hidden;${st}">
  <iframe
    src="https://maps.google.com/maps?q=${encoded}&z=${zoom}&output=embed"
    width="100%" height="100%" style="border:none" loading="lazy"
    allowfullscreen referrerpolicy="no-referrer-when-downgrade">
  </iframe>
</div>`;
    }

    case "whatsapp-button": {
      const number = (c.number as string) || settings.whatsappNumber || "";
      const message = encodeURIComponent((c.message as string) || "Hello!");
      const label = (c.label as string) || "Chat on WhatsApp";
      const clean = number.replace(/\D/g, "");
      return `
<a href="https://wa.me/${clean}?text=${message}" target="_blank" rel="noopener noreferrer"
  style="display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;padding:14px 24px;border-radius:50px;font-weight:700;text-decoration:none;${st}">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  ${escHtml(label)}
</a>`;
    }

    case "link-in-bio": {
      const links = (c.links as { label: string; url: string; icon?: string }[]) || [];
      const avatar = (c.avatar as string) || "";
      const name = (c.name as string) || settings.siteName;
      const bio = (c.bio as string) || "";
      const items = links.map((l) =>
        `<a href="${escAttr(l.url)}" target="_blank" rel="noopener noreferrer"
          style="display:block;padding:14px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;text-decoration:none;color:inherit;font-weight:600;margin-bottom:10px;text-align:center;transition:transform 0.1s"
          onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${escHtml(l.label)}</a>`
      ).join("");
      return `
<div style="max-width:480px;margin:0 auto;padding:40px 20px;text-align:center;${st}">
  ${avatar ? `<img src="${escAttr(avatar)}" alt="${escAttr(name)}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin:0 auto 12px" />` : ""}
  <h2 style="font-weight:800;margin-bottom:6px">${escHtml(name)}</h2>
  ${bio ? `<p style="font-size:0.9rem;opacity:0.7;margin-bottom:20px">${escHtml(bio)}</p>` : ""}
  ${items}
</div>`;
    }

    case "menu-section": {
      const items = (c.items as { name: string; description?: string; price: string; image?: string }[]) || [];
      const title = (c.title as string) || "";
      const cards = items.map((item) => `
<div style="display:flex;gap:12px;padding:16px;border:1px solid #e2e8f0;border-radius:12px">
  ${item.image ? `<img src="${escAttr(item.image)}" alt="${escAttr(item.name)}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;flex-shrink:0" />` : ""}
  <div style="flex:1">
    <div style="display:flex;justify-content:space-between;align-items:start">
      <h4 style="font-weight:700;margin-bottom:4px">${escHtml(item.name)}</h4>
      <span style="font-weight:700;color:${settings.primaryColor};white-space:nowrap;margin-left:12px">${escHtml(item.price)}</span>
    </div>
    ${item.description ? `<p style="font-size:0.875rem;opacity:0.7;line-height:1.5">${escHtml(item.description)}</p>` : ""}
  </div>
</div>`).join("");
      return `
<div style="${st}">
  ${title ? `<h2 style="font-weight:800;margin-bottom:20px;font-size:1.5rem">${escHtml(title)}</h2>` : ""}
  <div style="display:flex;flex-direction:column;gap:12px">${cards}</div>
</div>`;
    }

    default:
      return `<!-- element type "${el.type}" not rendered -->`;
  }
}

// ── HTML escaping ─────────────────────────────────────────────

function escHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escAttr(str: string): string {
  return String(str).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// ── Full page HTML wrapper ────────────────────────────────────

export function buildPageHtml(page: BuilderPage, builderJson: BuilderJSON, siteId: string): string {
  const s = builderJson.siteSettings;
  const g = builderJson.globalStyles || {};

  const sectionsHtml = page.sections
    .filter((sec) => sec.isVisible !== false)
    .map((sec) => renderSection(sec, s, siteId))
    .join("\n");

  const primaryColor = s.primaryColor || g.primaryColor || "#6272f1";
  const fontFamily = s.fontFamily || g.fontFamily || "Inter,system-ui,sans-serif";
  const bgColor = g.bodyBackground || "#ffffff";
  const textColor = g.textColor || "#1e293b";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escHtml(page.seo?.title || s.seoTitle || s.siteName)}</title>
  ${page.seo?.description ? `<meta name="description" content="${escAttr(page.seo.description)}" />` : s.seoDescription ? `<meta name="description" content="${escAttr(s.seoDescription)}" />` : ""}
  ${s.favicon ? `<link rel="icon" href="${escAttr(s.favicon)}" />` : ""}
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font-family:${fontFamily};background:${bgColor};color:${textColor};line-height:1.6}
    img{max-width:100%}
    a{color:${primaryColor}}
    details summary::-webkit-details-marker{display:none}
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  ${fontFamily.includes("Inter") ? `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">` : ""}
</head>
<body>
${sectionsHtml}
</body>
</html>`;
}
