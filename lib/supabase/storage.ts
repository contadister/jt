// lib/supabase/storage.ts
// Supabase Storage Buckets — replaces Cloudinary. FREE up to 1GB.

import { createClient } from "./client";

const BUCKET_SITES = "site-assets";
const BUCKET_AVATARS = "avatars";
const BUCKET_TEMPLATES = "template-previews";

export type StorageBucket =
  | typeof BUCKET_SITES
  | typeof BUCKET_AVATARS
  | typeof BUCKET_TEMPLATES;

export async function uploadFile(
  bucket: StorageBucket,
  path: string,
  file: File,
  options?: { contentType?: string }
): Promise<string | null> {
  const supabase = createClient();

  // Convert to webp for images to save space
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
      contentType: options?.contentType || file.type,
      cacheControl: "3600",
    });

  if (error) {
    console.error("Storage upload error:", error.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

export async function uploadSiteImage(
  siteId: string,
  file: File
): Promise<string | null> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${siteId}/${Date.now()}.${ext}`;
  return uploadFile(BUCKET_SITES, path, file);
}

export async function uploadAvatar(
  userId: string,
  file: File
): Promise<string | null> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${userId}/avatar.${ext}`;
  return uploadFile(BUCKET_AVATARS, path, file);
}

export async function uploadFavicon(
  siteId: string,
  file: File
): Promise<string | null> {
  const path = `${siteId}/favicon.ico`;
  return uploadFile(BUCKET_SITES, path, file);
}

export async function uploadLogo(
  siteId: string,
  file: File
): Promise<string | null> {
  const ext = file.name.split(".").pop() || "png";
  const path = `${siteId}/logo.${ext}`;
  return uploadFile(BUCKET_SITES, path, file);
}

export async function deleteFile(
  bucket: StorageBucket,
  path: string
): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  return !error;
}

export async function deleteSiteAssets(siteId: string): Promise<void> {
  const supabase = createClient();
  const { data } = await supabase.storage
    .from(BUCKET_SITES)
    .list(siteId);

  if (data && data.length > 0) {
    const paths = data.map((f) => `${siteId}/${f.name}`);
    await supabase.storage.from(BUCKET_SITES).remove(paths);
  }
}

// ── Supabase Storage Setup Instructions ────────────────────────────────────
// Run this SQL in your Supabase SQL Editor to create the buckets:
//
// INSERT INTO storage.buckets (id, name, public)
// VALUES
//   ("site-assets", "site-assets", true),
//   ("avatars", "avatars", true),
//   ("template-previews", "template-previews", true);
//
// Then add RLS policies:
// -- Allow authenticated users to upload to site-assets
// CREATE POLICY "Auth users can upload"
//   ON storage.objects FOR INSERT
//   TO authenticated
//   WITH CHECK (bucket_id = "site-assets");
//
// -- Allow public read
// CREATE POLICY "Public read"
//   ON storage.objects FOR SELECT
//   TO public
//   USING (bucket_id IN ("site-assets", "avatars", "template-previews"));
