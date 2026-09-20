import ProductDescription from "@/components/ProductDescription"
import ProductDetails from "@/components/ProductDetails"
import { prisma } from "@/lib/prisma"
import { SITE, SITE_URL } from "@/lib/site"
import StructuredData from "@/components/StructuredData"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cache } from "react"

const getProduct = cache(async (productId) => {
    return prisma.product.findUnique({
        where: { id: productId },
        include: {
            store: { select: { name: true, username: true, logo: true } },
            rating: {
                include: { user: { select: { name: true, image: true } } },
                orderBy: { createdAt: "desc" },
            },
        },
    })
})

export async function generateMetadata({ params }) {
    const { productId } = await params
    const product = await getProduct(productId)
    if (!product) return { title: "Product not found" }

    const title = `${product.name} | ${product.brand} ${product.storageSize} ${product.category}`
    const description = `${product.brand} ${product.storageSize} ${product.category} with a ${product.warrantyMonths}-month warranty. ${product.description}`.slice(0, 160)
    const canonical = `${SITE_URL}/product/${product.id}`

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            type: "website",
            images: product.images.map((url) => ({ url, alt: `${product.name} product image` })),
        },
        twitter: { card: "summary_large_image", title, description, images: product.images.slice(0, 1) },
    }
}

export default async function ProductPage({ params }) {
    const { productId } = await params
    const product = await getProduct(productId)
    if (!product) notFound()

    const averageRating = product.rating.length
        ? product.rating.reduce((total, review) => total + review.rating, 0) / product.rating.length
        : null
    const productUrl = `${SITE_URL}/product/${product.id}`
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images,
        sku: product.id,
        url: productUrl,
        brand: { "@type": "Brand", name: product.brand },
        category: product.category,
        additionalProperty: [
            { "@type": "PropertyValue", name: "Storage capacity", value: product.storageSize },
            { "@type": "PropertyValue", name: "Warranty", value: `${product.warrantyMonths} months` },
        ],
        offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "PKR",
            price: product.price,
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@type": "Organization", name: SITE.name },
        },
        ...(averageRating ? {
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: averageRating.toFixed(1),
                reviewCount: product.rating.length,
            },
        } : {}),
    }
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/shop` },
            { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
        ],
    }

    return (
        <main className="mx-6">
            <StructuredData data={[structuredData, breadcrumbData]} />
            <div className="max-w-7xl mx-auto">
                <nav aria-label="Breadcrumb" className="text-slate-600 text-sm mt-8 mb-5">
                    <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/shop">Products</Link> <span aria-hidden="true">/</span> {product.category}
                </nav>
                <ProductDetails product={product} />
                <ProductDescription product={product} />
                <p className="mb-16 text-xs text-slate-500">Product information last updated {new Intl.DateTimeFormat("en-PK", { dateStyle: "long" }).format(product.updatedAt)}.</p>
            </div>
        </main>
    )
}
