import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { uploadFile, type UploadBucket } from "@/lib/supabase/storage";

export async function POST(req: Request) {
  try {
    // Auth check
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bucket = (formData.get("bucket") as UploadBucket) || "site-assets";
    const path = formData.get("path") as string;

    if (!file || !path) {
      return NextResponse.json({ error: "Missing file or path" }, { status: 400 });
    }

    const url = await uploadFile(file, bucket, path);
    return NextResponse.json({ url });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
