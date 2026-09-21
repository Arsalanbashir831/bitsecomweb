'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const LatestProducts = () => {

    const displayQuantity = 4
    const products = useSelector(state => state.product.list)

    return (
        <section className='mx-auto my-24 max-w-6xl px-6 sm:my-32' data-reveal-section>
            <Title title='Latest Products' description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`} href='/shop' />
            <div className='mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4'>
                {products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, displayQuantity).map((product, index) => (
                    <div key={product.id} data-reveal-item><ProductCard product={product} /></div>
                ))}
            </div>
        </section>
    )
}

export default LatestProducts
