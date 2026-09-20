import { NextResponse } from "next/server"
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"
import { put } from "@vercel/blob"
import { MAX_UPLOAD_BYTES, UPLOAD_DIR, UPLOAD_EXTENSIONS } from "@/lib/uploads"

export async function POST(request) {
    const formData = await request.formData().catch(() => null)
    if (!formData) return NextResponse.json({ error: "Invalid form data" }, { status: 400 })

    const files = formData.getAll("files").filter((entry) => entry instanceof File)
    if (files.length === 0) return NextResponse.json({ error: "No files provided" }, { status: 400 })

    const urls = []
    for (const file of files) {
        const extension = UPLOAD_EXTENSIONS[file.type]
        if (!extension) {
            return NextResponse.json({ error: `Unsupported file type: ${file.type || file.name}` }, { status: 400 })
        }
        if (file.size > MAX_UPLOAD_BYTES) {
            return NextResponse.json({ error: `${file.name} is larger than 8MB` }, { status: 413 })
        }
        const name = `${Date.now()}-${randomUUID()}${extension}`
        if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) {
            const blob = await put(`products/${name}`, file, { access: "public", addRandomSuffix: false })
            urls.push(blob.url)
        } else {
            await mkdir(UPLOAD_DIR, { recursive: true })
            await writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()))
            urls.push(`/uploads/${name}`)
        }
    }

    return NextResponse.json({ urls })
}
