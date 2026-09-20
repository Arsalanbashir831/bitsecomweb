import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { ADMIN_COOKIE } from "@/lib/admin-cookie"

export async function proxy(request) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get(ADMIN_COOKIE)?.value

    let authorized = false
    if (token) {
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET))
            authorized = payload.role === "admin"
        } catch {
            authorized = false
        }
    }

    if (pathname === "/admin/login" || pathname === "/api/admin/login") {
        if (authorized && pathname === "/admin/login") {
            return NextResponse.redirect(new URL("/admin", request.url))
        }
        return NextResponse.next()
    }

    if (authorized) return NextResponse.next()

    if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/admin/login", request.url))
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
}
