import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isProductBrand, isProductCategory, isStorageSize } from "@/lib/product-options"

export async function GET() {
    const products = await prisma.product.findMany({
        include: { store: { select: { name: true, username: true } } },
        orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ products })
}

export async function POST(request) {
    const body = await request.json().catch(() => ({}))
    const { name, description, price, images, category, brand, storageSize, warrantyMonths, inStock } = body

    if (!name || !description || !isProductCategory(category) || !isProductBrand(brand) || !isStorageSize(storageSize)) {
        return NextResponse.json({ error: "Enter valid product details" }, { status: 400 })
    }
    const priceValue = Number(price)
    const warrantyValue = Number(warrantyMonths)
    if (!Number.isFinite(priceValue) || priceValue < 0) {
        return NextResponse.json({ error: "Retailer price must be a valid number" }, { status: 400 })
    }
    if (!Number.isInteger(warrantyValue) || warrantyValue < 0 || warrantyValue > 120) {
        return NextResponse.json({ error: "Warranty must be between 0 and 120 months" }, { status: 400 })
    }
    if (!Array.isArray(images) || images.length === 0) {
        return NextResponse.json({ error: "At least one image is required" }, { status: 400 })
    }

    const store = await prisma.store.findFirst({
        where: { status: "approved", isActive: true },
        orderBy: { createdAt: "asc" },
        select: { id: true },
    })

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price: priceValue,
            images,
            category,
            brand,
            storageSize,
            warrantyMonths: warrantyValue,
            inStock: Boolean(inStock),
            storeId: store?.id ?? null,
        },
    })
    return NextResponse.json({ product }, { status: 201 })
}
