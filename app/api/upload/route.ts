import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/requireUser";
import { uploadFile, type StorageBucket } from "@/lib/supabase/storage";

export async function POST(req: Request) {
  try {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bucket = (formData.get("bucket") as StorageBucket) || "site-assets";
    const path = formData.get("path") as string;

    if (!file || !path) {
      return NextResponse.json({ error: "Missing file or path" }, { status: 400 });
    }

    const url = await uploadFile(bucket, path, file);
    return NextResponse.json({ url });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
