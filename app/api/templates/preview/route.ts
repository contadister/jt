// app/api/templates/preview/route.ts
// Returns rendered HTML for a template — used for live previews in the picker
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { TEMPLATES } from "@/lib/templates";
import { buildPageHtml } from "@/lib/renderer";
import type { BuilderJSON, BuilderPage } from "@/lib/types/builder";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const template = TEMPLATES.find((t) => t.id === id);
  if (!template) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const builderJson = template.builderJson as unknown as BuilderJSON;
  const homePage = builderJson.pages?.[0] as BuilderPage;
  if (!homePage) return new Response("<html><body>No pages</body></html>", { headers: { "Content-Type": "text/html" } });

  const html = buildPageHtml(homePage, builderJson, "preview", false);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Frame-Options": "SAMEORIGIN",
    },
  });
}
