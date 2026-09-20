import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json({ coupons })
}

export async function POST(request) {
    const body = await request.json().catch(() => ({}))
    const code = String(body.code || "").trim().toUpperCase()
    const description = String(body.description || "").trim()
    const discount = Number(body.discount)
    const expiresAt = new Date(body.expiresAt)

    if (!code || !description || !Number.isFinite(discount) || discount < 1 || discount > 100 || Number.isNaN(expiresAt.getTime())) {
        return NextResponse.json({ error: "Enter valid coupon details" }, { status: 400 })
    }

    try {
        const coupon = await prisma.coupon.create({
            data: {
                code,
                description,
                discount,
                expiresAt,
                forNewUser: Boolean(body.forNewUser),
                forMember: Boolean(body.forMember),
                isPublic: Boolean(body.isPublic),
            },
        })
        return NextResponse.json({ coupon }, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Coupon code already exists" }, { status: 409 })
    }
}
