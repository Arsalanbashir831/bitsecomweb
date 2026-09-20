import { NextResponse } from "next/server"
import { ADMIN_COOKIE, createAdminSessionToken, verifyAdminCredentials } from "@/lib/admin-auth"

export async function POST(request) {
    const { username, password } = await request.json().catch(() => ({}))

    if (!verifyAdminCredentials(username, password)) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    const token = await createAdminSessionToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    })
    return response
}
