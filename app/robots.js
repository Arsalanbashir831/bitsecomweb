import { SITE_URL } from "@/lib/site"

export default function robots() {
    return {
        rules: ["*", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "Bingbot", "Googlebot"].map((userAgent) => ({
            userAgent,
            allow: "/",
            disallow: ["/admin/", "/store/", "/api/", "/cart", "/orders", "/create-store", "/loading"],
        })),
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
