import { unlink } from "fs/promises"
import path from "path"
import { del } from "@vercel/blob"

export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

export const UPLOAD_EXTENSIONS = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/avif": ".avif",
}

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

export async function deleteUpload(url) {
    if (typeof url === "string" && url.includes(".public.blob.vercel-storage.com/")) {
        await del(url).catch(() => {})
        return
    }
    if (typeof url !== "string" || !url.startsWith("/uploads/")) return
    const name = path.basename(url)
    if (!name || name === "." || name === "..") return
    await unlink(path.join(UPLOAD_DIR, name)).catch(() => {})
}
