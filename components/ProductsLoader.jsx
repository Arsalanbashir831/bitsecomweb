'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProduct } from '@/lib/features/product/productSlice'

const ProductsLoader = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products')
                const data = await res.json()
                dispatch(setProduct(data.products || []))
            } catch (error) {
                dispatch(setProduct([]))
            }
        }
        fetchProducts()
    }, [dispatch])

    return null
}

export default ProductsLoader
