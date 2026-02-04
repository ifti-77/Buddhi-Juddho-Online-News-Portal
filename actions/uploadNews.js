"use server";

import path from "node:path";
import crypto from "node:crypto";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { getSession } from "@/lib/session";
// function getBaseUrl() {
//   // Required because this runs on the server (Node) — relative fetch can fail
//   // in many cases; absolute URL is safer. :contentReference[oaicite:2]{index=2}
//   if (process.env.APP_URL) return process.env.APP_URL;
//   if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
//   return "http://localhost:3000";
// }

export async function uploadNews(prevState, formData) {
  const errors = {};

  const title = (formData.get("title") ?? "").toString().trim();
  const content = (formData.get("content") ?? "").toString().trim();
  const category = (formData.get("category") ?? "").toString().trim();
  const isFeatured = (formData.get("isFeatured")==='yes'? true : false); // fallback
  const session = await getSession();
  const author = session?.name;
  const authorID = session?.username;

 
  if (!title) errors.title = ["Title is required"];
  if (!content) errors.content = ["Content is required"];
  if (!category) errors.category = ["Category is required"];
  if (!authorID) errors.authorID = ["Author ID is required"];
  if (!author) errors.author = ["Author is required"];

  if (title && (title.length < 4 || title.length > 200)) {
    errors.title = [...(errors.title || []), "Title must be 4–200 characters"];
  }

  if (content && (content.length < 10 || content.length > 5000)) {
    errors.content = [...(errors.content || []), "Content must be 10–5000 characters"];
  }

  const file = formData.get("thumbnail");
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

  if (!(file instanceof File) || file.size === 0) {
    errors.thumbnail = ["Thumbnail is required"];
  } else {
    if (file.size > 2 * 1024 * 1024) {
      errors.thumbnail = [...(errors.thumbnail || []), "Thumbnail must be <= 2MB"];
    }
    if (!allowedTypes.has(file.type)) {
      errors.thumbnail = [...(errors.thumbnail || []), "Only JPG, PNG, WEBP allowed"];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, message: "Please fix the errors below." };
  }

  // ---- Upload + save ----
  try {
    // Save file into /public/uploads so it is accessible as /uploads/<filename>
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const extByType = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };

    const safeExt = extByType[file.type] || path.extname(file.name) || ".bin";
    const filename = `${crypto.randomUUID()}${safeExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadsDir, filename), buffer);

    const thumbnailUrl = `/uploads/${filename}`;

    // const baseUrl = getBaseUrl();
    const result = await fetch(`http://localhost:3000/api/News/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        author,
        authorID,
        category,
        isFeatured,
        thumbnailPath: thumbnailUrl,
      }),
    });

    const data = await result.json().catch(() => ({}));

    if (!result.ok) {
      return {
        ok: false,
        errors: {},
        message: data?.error || "Failed to submit news.",
      };
    }

    return { ok: true, errors: {}, message: "News submitted successfully!" };
  } catch (err) {
    return { ok: false, errors: {}, message: err?.message || "Upload failed." };
  }
}


export async function replaceThumbnailWithNewId(updatedImage, current_image) {
  if (!updatedImage) return current_image;

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  // Decide extension (keep it simple + safe)
  const extByType = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };

  const newExt =
    (path.extname(updatedImage.name) || extByType[updatedImage.type] || ".bin").toLowerCase();

  // 1) write new file with NEW UUID
  const newName = `${crypto.randomUUID()}${newExt}`;
  const newAbs = path.join(uploadsDir, newName);

  const buffer = Buffer.from(await updatedImage.arrayBuffer());
  await writeFile(newAbs, buffer);

  const newUrl = `/uploads/${newName}`;

  // 2) delete old file (ignore if missing)
  if (current_image) {
    const rel = current_image.startsWith("/") ? current_image.slice(1) : current_image; // "uploads/old.jpg"
    const oldAbs = path.join(process.cwd(), "public", rel);
    await unlink(oldAbs).catch(() => {});
  }

  // 3) return new URL (store this in DB)
  return newUrl;
}

export async function DeleteThumbnail(current_image) {
  if (!current_image) return true;
  if (current_image) {
    const rel = current_image.startsWith("/") ? current_image.slice(1) : current_image; // "uploads/old.jpg"
    const oldAbs = path.join(process.cwd(), "public", rel);
    await unlink(oldAbs).catch(() => {});
    return true;
  }
  return false;
}