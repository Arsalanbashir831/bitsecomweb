import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"
import { put } from "@vercel/blob"
import { ensureProductImageDirectory, MAX_UPLOAD_BYTES, UPLOAD_EXTENSIONS } from "@/lib/uploads"
import { slugifyProductName } from "@/lib/product-slug"

export async function POST(request) {
    const formData = await request.formData().catch(() => null)
    if (!formData) return NextResponse.json({ error: "Invalid form data" }, { status: 400 })

    const files = formData.getAll("files").filter((entry) => entry instanceof File)
    if (files.length === 0) return NextResponse.json({ error: "No files provided" }, { status: 400 })

    const productName = String(formData.get("productName") ?? '').trim()
    if (!productName) return NextResponse.json({ error: "Enter a product name before uploading images" }, { status: 400 })

    for (const file of files) {
        const extension = UPLOAD_EXTENSIONS[file.type]
        if (!extension) {
            return NextResponse.json({ error: `Unsupported file type: ${file.type || file.name}` }, { status: 400 })
        }
        if (file.size > MAX_UPLOAD_BYTES) {
            return NextResponse.json({ error: `${file.name} is larger than 8MB` }, { status: 413 })
        }
    }

    const urls = []
    const productFolder = slugifyProductName(productName)
    const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

    if (process.env.VERCEL && !useBlob) {
        return NextResponse.json({ error: "Vercel Blob is not connected to this deployment" }, { status: 503 })
    }

    const directory = useBlob ? null : await ensureProductImageDirectory(productFolder)

    for (const file of files) {
        const extension = UPLOAD_EXTENSIONS[file.type]
        const name = `${Date.now()}-${randomUUID()}${extension}`
        if (useBlob) {
            const blob = await put(`assets/products-listing/${productFolder}/${name}`, file, {
                access: 'public',
                addRandomSuffix: false,
            })
            urls.push(blob.url)
        } else {
            await writeFile(path.join(directory.absolutePath, name), Buffer.from(await file.arrayBuffer()), { flag: 'wx' })
            urls.push(`${directory.publicPrefix}${name}`)
        }
    }

    return NextResponse.json({ urls })
}
