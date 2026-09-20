'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, DatabaseIcon, EarthIcon, CreditCardIcon, ShieldCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter()

    const [mainImage, setMainImage] = useState(product.images[0]);

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const averageRating = product.rating.length
        ? product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length
        : 0;
    
    return (
        <div className="flex max-lg:flex-col gap-12">
            <div className="flex max-sm:flex-col-reverse gap-3">
                <div className="flex sm:flex-col gap-3">
                    {product.images.map((image, index) => (
                        <div key={index} onClick={() => setMainImage(product.images[index])} className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer">
                            <Image src={image} className="group-hover:scale-103 group-active:scale-95 transition" alt={`${product.brand} ${product.storageSize} ${product.category} view ${index + 1}`} width={90} height={90} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg ">
                    <Image src={mainImage} alt={`${product.name} — ${product.brand} ${product.storageSize} ${product.category}`} width={500} height={500} className="max-h-80 w-auto object-contain" priority />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="text-3xl font-semibold text-slate-800">{product.name}</h1>
                {product.rating.length > 0 && <div className='flex items-center mt-2'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                    ))}
                    <p className="text-sm ml-3 text-slate-500">{product.rating.length} Reviews</p>
                </div>}
                <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
                    <p>{currency} {product.price.toLocaleString()}</p>
                </div>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm max-w-xl">
                    <div><dt className="text-slate-400">Brand</dt><dd className="mt-1 font-medium text-slate-800">{product.brand}</dd></div>
                    <div><dt className="text-slate-400">Drive type</dt><dd className="mt-1 font-medium text-slate-800">{product.category}</dd></div>
                    <div><dt className="text-slate-400">Storage capacity</dt><dd className="mt-1 font-medium text-slate-800">{product.storageSize}</dd></div>
                    <div><dt className="text-slate-400">Warranty</dt><dd className="mt-1 font-medium text-slate-800">{product.warrantyMonths} months</dd></div>
                </dl>
                <div className="flex items-center gap-2 text-slate-500 mt-5">
                    <DatabaseIcon size={16} />
                    <p>{product.inStock ? 'Available for ordering' : 'Currently out of stock'}</p>
                </div>
                <div className="flex items-end gap-5 mt-10">
                    {
                        cart[productId] && (
                            <div className="flex flex-col gap-3">
                                <p className="text-lg text-slate-800 font-semibold">Quantity</p>
                                <Counter productId={productId} />
                            </div>
                        )
                    }
                    <button onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} className="bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition">
                        {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                    </button>
                </div>
                <hr className="border-gray-300 my-5" />
                <div className="flex flex-col gap-4 text-slate-500">
                    <p className="flex gap-3"> <EarthIcon className="text-slate-400" /> Delivery availability confirmed during ordering </p>
                    <p className="flex gap-3"> <CreditCardIcon className="text-slate-400" /> Available payment methods shown at checkout </p>
                    <p className="flex gap-3"> <ShieldCheckIcon className="text-slate-400" /> {product.warrantyMonths}-month product warranty </p>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails
