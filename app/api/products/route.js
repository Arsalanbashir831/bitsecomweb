import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const products = await prisma.product.findMany({
        include: {
            store: { select: { id: true, name: true, username: true, logo: true } },
            rating: {
                include: { user: { select: { name: true, image: true } } },
                orderBy: { createdAt: "desc" },
            },
        },
        orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ products })
}
