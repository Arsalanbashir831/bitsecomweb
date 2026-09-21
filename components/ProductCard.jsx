'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = product.rating.length
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 0;

    return (
        <Link href={`/product/${product.slug}`} className='group block focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-600'>
            <div className='flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-transparent bg-slate-100 transition-colors duration-300 group-hover:border-slate-200'>
                <Image width={500} height={500} className='max-h-[62%] w-auto max-w-[78%] object-contain transition-transform duration-500 ease-out group-hover:scale-110' src={product.images[0]} alt={`${product.name} — ${product.brand} ${product.storageSize} ${product.category}`} />
            </div>
            <div className='flex justify-between gap-3 pt-4 text-sm text-slate-800'>
                <div className='min-w-0'>
                    <p className='truncate font-medium'>{product.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{product.brand} · {product.storageSize} · {product.category}</p>
                    {product.rating.length > 0 && <div className='flex' aria-label={`${rating} out of 5 stars from ${product.rating.length} reviews`}>
                        {Array(5).fill('').map((_, index) => <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"} />)}
                    </div>}
                </div>
                <p className="font-medium whitespace-nowrap">{currency} {product.price.toLocaleString()}</p>
            </div>
        </Link>
    )
}

export default ProductCard
