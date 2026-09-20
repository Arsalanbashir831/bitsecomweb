import { createHash, timingSafeEqual } from "crypto"
import { SignJWT, jwtVerify } from "jose"
import { ADMIN_COOKIE } from "@/lib/admin-cookie"

export { ADMIN_COOKIE }

const sha256 = (value) => createHash("sha256").update(String(value)).digest()

const secretKey = () => new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET)

export function verifyAdminCredentials(username, password) {
    const expectedUser = process.env.ADMIN_USERNAME
    const expectedPassword = process.env.ADMIN_PASSWORD
    if (!expectedUser || !expectedPassword || !username || !password) return false
    const userMatches = timingSafeEqual(sha256(username), sha256(expectedUser))
    const passwordMatches = timingSafeEqual(sha256(password), sha256(expectedPassword))
    return userMatches && passwordMatches
}

export async function createAdminSessionToken() {
    return new SignJWT({ role: "admin", user: process.env.ADMIN_USERNAME })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secretKey())
}

export async function verifyAdminSessionToken(token) {
    if (!token) return null
    try {
        const { payload } = await jwtVerify(token, secretKey())
        return payload.role === "admin" ? payload : null
    } catch {
        return null
    }
}
