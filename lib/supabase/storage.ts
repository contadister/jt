// lib/supabase/storage.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "josett-uploads";

export type UploadFolder = "avatars" | "sites" | "templates" | "products" | "blog" | "logos" | "favicons";

export async function uploadFile(
  file: File | Buffer,
  folder: UploadFolder,
  fileName: string
): Promise<string> {
  const name = typeof fileName === "string" ? fileName : `${Date.now()}.jpg`;
  const path = `${folder}/${Date.now()}-${name}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file instanceof File ? file.type : "image/jpeg",
  });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadFromBase64(
  base64: string,
  folder: UploadFolder,
  fileName: string
): Promise<string> {
  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error("Invalid base64 string");

  const mimeType = matches[1];
  const data = matches[2];
  const buffer = Buffer.from(data, "base64");
  const path = `${folder}/${Date.now()}-${fileName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    upsert: true,
    contentType: mimeType,
  });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return urlData.publicUrl;
}

export async function deleteFile(url: string): Promise<void> {
  const path = url.split(`${BUCKET}/`)[1];
  if (!path) return;

  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) console.error("Delete file error:", error.message);
}

export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function listFiles(folder: UploadFolder) {
  const { data, error } = await supabase.storage.from(BUCKET).list(folder);
  if (error) throw error;
  return data;
}
