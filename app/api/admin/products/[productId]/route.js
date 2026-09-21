import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { deleteUpload } from "@/lib/uploads"
import { isProductBrand, isProductCategory, isStorageSize } from "@/lib/product-options"

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
    if (body.brand !== undefined) data.brand = String(body.brand)
    if (body.storageSize !== undefined) data.storageSize = String(body.storageSize)
    if (body.warrantyMonths !== undefined) data.warrantyMonths = Number(body.warrantyMonths)
    if (body.inStock !== undefined) data.inStock = Boolean(body.inStock)
    if (body.price !== undefined) data.price = Number(body.price)
    if (body.images !== undefined) data.images = body.images

    if (data.category !== undefined && !isProductCategory(data.category)) {
        return NextResponse.json({ error: "Category must be HDD or SSD" }, { status: 400 })
    }
    if (data.brand !== undefined && !isProductBrand(data.brand)) {
        return NextResponse.json({ error: "Select a valid brand" }, { status: 400 })
    }
    if (data.storageSize !== undefined && !isStorageSize(data.storageSize)) {
        return NextResponse.json({ error: "Select a valid storage size" }, { status: 400 })
    }
    if (data.warrantyMonths !== undefined && (!Number.isInteger(data.warrantyMonths) || data.warrantyMonths < 0 || data.warrantyMonths > 120)) {
        return NextResponse.json({ error: "Warranty must be between 0 and 120 months" }, { status: 400 })
    }
    if (data.price !== undefined && (!Number.isFinite(data.price) || data.price < 0)) {
        return NextResponse.json({ error: "Retailer price must be a valid number" }, { status: 400 })
    }
    if (data.images !== undefined && (!Array.isArray(data.images) || data.images.length === 0)) {
        return NextResponse.json({ error: "At least one image is required" }, { status: 400 })
    }

    try {
        const existing = await prisma.product.findUnique({ where: { id: productId }, select: { images: true } })
        if (!existing) return NextResponse.json({ error: "Product not found" }, { status: 404 })

        const product = await prisma.product.update({ where: { id: productId }, data })
        if (data.images !== undefined) {
            const retainedImages = new Set(data.images)
            await Promise.all(existing.images.filter((url) => !retainedImages.has(url)).map((url) => deleteUpload(url)))
        }
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
