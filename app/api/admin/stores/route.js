import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const stores = await prisma.store.findMany({
        select: { id: true, name: true, username: true, status: true, isActive: true },
        orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ stores })
}
