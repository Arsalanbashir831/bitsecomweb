import { prisma } from "@/lib/prisma"
import { absoluteUrl } from "@/lib/site"

export default async function sitemap() {
    const staticPages = [
        { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
        { url: absoluteUrl("/shop"), changeFrequency: "daily", priority: 0.9 },
        { url: absoluteUrl("/storage-guide"), changeFrequency: "monthly", priority: 0.8 },
        { url: absoluteUrl("/warranty-policy"), changeFrequency: "yearly", priority: 0.7 },
        { url: absoluteUrl("/contact-us"), changeFrequency: "yearly", priority: 0.7 },
    ]

    try {
        const products = await prisma.product.findMany({
            select: { slug: true, updatedAt: true, images: true },
            orderBy: { updatedAt: "desc" },
        })

        return [
            ...staticPages,
            ...products.map((product) => ({
                url: absoluteUrl(`/product/${product.slug}`),
                lastModified: product.updatedAt,
                changeFrequency: "weekly",
                priority: 0.8,
                images: product.images,
            })),
        ]
    } catch {
        return staticPages
    }
}
