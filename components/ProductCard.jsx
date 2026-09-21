'use client'
import { ArrowUpRight, ShieldCheck, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = product.rating.length
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 0;
    const image = product.images?.[0] || '/uploads/bits-logo.png'
    const isPlaceholder = image === '/uploads/bits-logo.png'

    return (
        <Link href={`/product/${product.slug}`} className='group block h-full focus-visible:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-600'>
            <article className='flex h-full flex-col'>
            <div className='relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 transition-colors duration-300 group-hover:border-slate-300'>
                <div className='absolute left-4 top-4 z-[1] flex items-center gap-2'>
                    <span className='rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur-sm'>{product.storageSize}</span>
                    <span className={`size-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`} title={product.inStock ? 'In stock' : 'Out of stock'} />
                </div>
                {isPlaceholder && <p className='absolute bottom-4 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400'>Product image coming soon</p>}
                <Image width={500} height={500} className={`${isPlaceholder ? 'max-h-[26%] max-w-[44%] opacity-70' : 'max-h-[66%] max-w-[76%]'} h-auto w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105`} src={image} alt={`${product.name} — ${product.brand} ${product.storageSize} ${product.category}`} />
                <span className='absolute bottom-4 right-4 flex size-10 translate-y-2 items-center justify-center rounded-full bg-slate-950 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'><ArrowUpRight size={17} /></span>
            </div>
            <div className='flex flex-1 justify-between gap-4 pt-5 text-sm text-slate-800'>
                <div className='min-w-0'>
                    <p className='truncate text-base font-semibold text-slate-950'>{product.name}</p>
                    <p className="mt-1.5 text-xs text-slate-500">{product.brand} · {product.category}</p>
                    <p className='mt-3 flex items-center gap-1.5 text-xs text-slate-600'><ShieldCheck className='text-green-600' size={14} /> {product.warrantyMonths}-month warranty</p>
                    {product.rating.length > 0 && <div className='mt-2 flex' aria-label={`${rating} out of 5 stars from ${product.rating.length} reviews`}>
                        {Array(5).fill('').map((_, index) => <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"} />)}
                    </div>}
                </div>
                <div className='shrink-0 text-right'>
                    <p className='font-mono text-[9px] uppercase tracking-widest text-slate-400'>Price</p>
                    <p className="mt-1 whitespace-nowrap text-base font-semibold text-slate-950">{currency} {product.price.toLocaleString()}</p>
                </div>
            </div>
            </article>
        </Link>
    )
}

export default ProductCard
