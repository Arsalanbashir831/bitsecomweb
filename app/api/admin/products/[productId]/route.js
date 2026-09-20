import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { deleteUpload } from "@/lib/uploads"

export async function GET(_request, { params }) {
    const { productId } = await params
    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { store: { select: { name: true, username: true } } },
    })
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })
    return NextResponse.json({ product })
}

export async function PATCH(request, { params }) {
    const { productId } = await params
    const body = await request.json().catch(() => ({}))

    const data = {}
    if (body.name !== undefined) data.name = String(body.name)
    if (body.description !== undefined) data.description = String(body.description)
    if (body.category !== undefined) data.category = String(body.category)
    if (body.inStock !== undefined) data.inStock = Boolean(body.inStock)
    if (body.mrp !== undefined) data.mrp = Number(body.mrp)
    if (body.price !== undefined) data.price = Number(body.price)
    if (body.images !== undefined) data.images = body.images
    if (body.storeId !== undefined) data.storeId = String(body.storeId)

    if (data.mrp !== undefined && !Number.isFinite(data.mrp)) {
        return NextResponse.json({ error: "MRP must be a number" }, { status: 400 })
    }
    if (data.price !== undefined && !Number.isFinite(data.price)) {
        return NextResponse.json({ error: "Price must be a number" }, { status: 400 })
    }
    if (data.storeId) {
        const store = await prisma.store.findUnique({ where: { id: data.storeId } })
        if (!store) return NextResponse.json({ error: "Store not found" }, { status: 400 })
    }

    try {
        const product = await prisma.product.update({ where: { id: productId }, data })
        return NextResponse.json({ product })
    } catch {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
}

export async function DELETE(_request, { params }) {
    const { productId } = await params
    const product = await prisma.product.findUnique({ where: { id: productId }, select: { images: true } })
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

    await prisma.product.delete({ where: { id: productId } })
    await Promise.all(product.images.map((url) => deleteUpload(url)))
    return NextResponse.json({ success: true })
}
