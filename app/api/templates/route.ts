export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { TEMPLATES } from "@/lib/templates";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const id = url.searchParams.get("id");

  // Single template with full builderJson
  if (id) {
    const t = TEMPLATES.find((t) => t.id === id);
    if (!t) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(t);
  }

  const templates = category ? TEMPLATES.filter((t) => t.category === category) : TEMPLATES;

  return NextResponse.json({
    templates: templates.map(({ builderJson: _bj, ...rest }) => rest),
    categories: [...new Set(TEMPLATES.map((t) => t.category))],
  });
}
