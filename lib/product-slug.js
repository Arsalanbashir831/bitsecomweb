export function slugifyProductName(value) {
    const slug = String(value ?? '')
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 100)

    return slug || 'product'
}

export async function createUniqueProductSlug(prisma, name) {
    const base = slugifyProductName(name)
    let candidate = base
    let suffix = 2

    while (await prisma.product.findUnique({ where: { slug: candidate }, select: { id: true } })) {
        candidate = `${base}-${suffix}`
        suffix += 1
    }

    return candidate
}
