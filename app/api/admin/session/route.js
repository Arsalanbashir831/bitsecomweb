import { NextResponse } from "next/server"
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth"

export async function GET(request) {
    const payload = await verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE)?.value)
    if (!payload) return NextResponse.json({ authenticated: false }, { status: 401 })
    return NextResponse.json({ authenticated: true, username: payload.user })
}
