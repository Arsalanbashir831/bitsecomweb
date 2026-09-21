import { mkdir, rmdir, unlink } from 'fs/promises'
import path from 'path'
import { del } from '@vercel/blob'
import { slugifyProductName } from '@/lib/product-slug'

export const PRODUCT_IMAGE_ROOT = path.join(process.cwd(), 'public', 'assets', 'products-listing')
export const PRODUCT_IMAGE_URL_PREFIX = '/assets/products-listing/'
const LEGACY_UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads')

export const UPLOAD_EXTENSIONS = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/avif': '.avif',
}

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

export function productImageDirectory(productNameOrSlug) {
    const folder = slugifyProductName(productNameOrSlug)
    return {
        folder,
        absolutePath: path.join(PRODUCT_IMAGE_ROOT, folder),
        publicPrefix: `${PRODUCT_IMAGE_URL_PREFIX}${folder}/`,
    }
}

export async function ensureProductImageDirectory(productNameOrSlug) {
    const directory = productImageDirectory(productNameOrSlug)
    await mkdir(directory.absolutePath, { recursive: true })
    return directory
}

export async function deleteUpload(url) {
    if (typeof url === 'string' && url.includes('.public.blob.vercel-storage.com/')) {
        await del(url).catch(() => {})
        return
    }

    if (typeof url === 'string' && url.startsWith('/uploads/')) {
        const fileName = url.slice('/uploads/'.length)
        if (fileName && path.basename(fileName) === fileName) {
            await unlink(path.join(LEGACY_UPLOAD_ROOT, fileName)).catch(() => {})
        }
        return
    }

    if (typeof url !== 'string' || !url.startsWith(PRODUCT_IMAGE_URL_PREFIX)) return

    const relativePath = url.slice(PRODUCT_IMAGE_URL_PREFIX.length)
    const segments = relativePath.split('/').filter(Boolean)
    if (segments.length !== 2) return

    const [folder, fileName] = segments
    if (folder !== slugifyProductName(folder) || path.basename(fileName) !== fileName) return

    const directory = path.join(PRODUCT_IMAGE_ROOT, folder)
    await unlink(path.join(directory, fileName)).catch(() => {})
    await rmdir(directory).catch(() => {})
}
