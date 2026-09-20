import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request, { params }) {
    const { username } = await params
    const store = await prisma.store.findUnique({
        where: { username },
        select: {
            id: true,
            name: true,
            description: true,
            username: true,
            address: true,
            logo: true,
            email: true,
            contact: true,
            isActive: true,
            status: true,
            Product: {
                include: {
                    store: { select: { id: true, name: true, username: true, logo: true } },
                    rating: {
                        include: { user: { select: { name: true, image: true } } },
                        orderBy: { createdAt: "desc" },
                    },
                },
                orderBy: { createdAt: "desc" },
            },
        },
    })

    if (!store || !store.isActive || store.status !== "approved") {
        return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    return NextResponse.json({ store })
}
