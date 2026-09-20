import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const [products, orders, stores, revenue, allOrders] = await Promise.all([
        prisma.product.count(),
        prisma.order.count(),
        prisma.store.count(),
        prisma.order.aggregate({ _sum: { total: true } }),
        prisma.order.findMany({ select: { createdAt: true }, orderBy: { createdAt: "asc" } }),
    ])

    return NextResponse.json({
        products,
        orders,
        stores,
        revenue: revenue._sum.total ?? 0,
        allOrders,
    })
}
