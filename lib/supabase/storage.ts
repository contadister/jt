// lib/supabase/storage.ts
// All file uploads use Supabase Storage Buckets — free & integrated
// Buckets to create in Supabase dashboard (all public read):
//   site-assets | avatars | blog-images | product-images | menu-images

import { createClient } from "./client";

export type UploadBucket =
  | "site-assets"
  | "avatars"
  | "blog-images"
  | "product-images"
  | "menu-images";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function uploadFile(
  file: File,
  bucket: UploadBucket,
  path: string
): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error("Invalid file type");
  if (file.size > MAX_SIZE) throw new Error("File too large. Maximum 10MB.");

  const supabase = createClient();
  const sanitized = path.replace(/[^a-zA-Z0-9/_.-]/g, "-");

  const { error } = await supabase.storage
    .from(bucket)
    .upload(sanitized, file, { upsert: true, contentType: file.type });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(sanitized);
  return data.publicUrl;
}

export async function deleteFile(bucket: UploadBucket, path: string): Promise<void> {
  const supabase = createClient();
  await supabase.storage.from(bucket).remove([path]);
}

export async function uploadSiteAsset(file: File, siteId: string, filename: string) {
  return uploadFile(file, "site-assets", `${siteId}/${filename}`);
}

export async function uploadAvatar(file: File, userId: string) {
  const ext = file.name.split(".").pop() || "jpg";
  return uploadFile(file, "avatars", `${userId}/avatar.${ext}`);
}

export async function uploadBlogImage(file: File, siteId: string, postId: string) {
  const ext = file.name.split(".").pop() || "jpg";
  return uploadFile(file, "blog-images", `${siteId}/${postId}/cover.${ext}`);
}

export async function uploadProductImage(file: File, siteId: string, productId: string, index: number) {
  const ext = file.name.split(".").pop() || "jpg";
  return uploadFile(file, "product-images", `${siteId}/${productId}/image-${index}.${ext}`);
}

export async function uploadMenuImage(file: File, siteId: string, itemId: string) {
  const ext = file.name.split(".").pop() || "jpg";
  return uploadFile(file, "menu-images", `${siteId}/${itemId}/photo.${ext}`);
}
