import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(_request, { params }) {
    const { code } = await params
    try {
        await prisma.coupon.delete({ where: { code } })
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Coupon not found" }, { status: 404 })
    }
}
