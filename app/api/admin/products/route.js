import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const products = await prisma.product.findMany({
        include: { store: { select: { name: true, username: true } } },
        orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ products })
}

export async function POST(request) {
    const body = await request.json().catch(() => ({}))
    const { name, description, mrp, price, images, category, inStock, storeId } = body

    if (!name || !description || !category || !storeId) {
        return NextResponse.json({ error: "Name, description, category and store are required" }, { status: 400 })
    }
    const mrpValue = Number(mrp)
    const priceValue = Number(price)
    if (!Number.isFinite(mrpValue) || !Number.isFinite(priceValue)) {
        return NextResponse.json({ error: "MRP and price must be numbers" }, { status: 400 })
    }
    if (!Array.isArray(images) || images.length === 0) {
        return NextResponse.json({ error: "At least one image is required" }, { status: 400 })
    }

    const store = await prisma.store.findUnique({ where: { id: storeId } })
    if (!store) return NextResponse.json({ error: "Store not found" }, { status: 400 })

    const product = await prisma.product.create({
        data: {
            name,
            description,
            mrp: mrpValue,
            price: priceValue,
            images,
            category,
            inStock: Boolean(inStock),
            storeId,
        },
    })
    return NextResponse.json({ product }, { status: 201 })
}
