import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const stores = await prisma.store.findMany({
        include: { user: { select: { name: true, email: true, image: true } } },
        orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ stores })
}

export async function PATCH(request) {
    const body = await request.json().catch(() => ({}))
    const { storeId, status, isActive } = body
    if (!storeId) return NextResponse.json({ error: "Store ID is required" }, { status: 400 })

    const data = {}
    if (status !== undefined) {
        if (!["pending", "approved", "rejected"].includes(status)) {
            return NextResponse.json({ error: "Invalid store status" }, { status: 400 })
        }
        data.status = status
        if (status !== "approved") data.isActive = false
    }
    if (isActive !== undefined) data.isActive = Boolean(isActive)

    try {
        const store = await prisma.store.update({ where: { id: storeId }, data })
        return NextResponse.json({ store })
    } catch {
        return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }
}
