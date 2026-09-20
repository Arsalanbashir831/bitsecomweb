'use client'
import Loading from "@/components/Loading"
import { CircleDollarSignIcon, ShoppingBasketIcon, StarIcon, TagsIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function Dashboard() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalEarnings: 0,
        totalOrders: 0,
        ratings: [],
    })

    const dashboardCardsData = [
        { title: 'Total Products', value: dashboardData.totalProducts, icon: ShoppingBasketIcon },
        { title: 'Total Earnings', value: currency + dashboardData.totalEarnings, icon: CircleDollarSignIcon },
        { title: 'Total Orders', value: dashboardData.totalOrders, icon: TagsIcon },
        { title: 'Total Ratings', value: dashboardData.ratings.length, icon: StarIcon },
    ]

    const fetchDashboardData = async () => {
        const response = await fetch('/api/products')
        if (response.ok) {
            const { products = [] } = await response.json()
            setDashboardData({
                totalProducts: products.length,
                totalEarnings: 0,
                totalOrders: 0,
                ratings: products.flatMap((product) =>
                    product.rating.map((rating) => ({ ...rating, product: { id: product.id, name: product.name, category: product.category } }))
                ),
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className=" text-slate-500 mb-28">
            <h1 className="text-2xl">Seller <span className="text-slate-800 font-medium">Dashboard</span></h1>

            <div className="flex flex-wrap gap-5 my-10 mt-4">
                {
                    dashboardCardsData.map((card, index) => (
                        <div key={index} className="flex items-center gap-11 border border-slate-200 p-3 px-6 rounded-lg">
                            <div className="flex flex-col gap-3 text-xs">
                                <p>{card.title}</p>
                                <b className="text-2xl font-medium text-slate-700">{card.value}</b>
                            </div>
                            <card.icon size={50} className=" w-11 h-11 p-2.5 text-slate-400 bg-slate-100 rounded-full" />
                        </div>
                    ))
                }
            </div>

            <h2>Total Reviews</h2>

            <div className="mt-5">
                {dashboardData.ratings.length === 0 ? (
                    <p className="text-sm text-slate-400">No customer reviews yet.</p>
                ) : dashboardData.ratings.map((review) => (
                    <div key={review.id} className="py-6 border-b border-slate-200 text-sm text-slate-600 max-w-4xl">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="font-medium text-slate-800">{review.user.name}</p>
                                <p className="text-slate-400">{review.product.name} · {review.product.category}</p>
                            </div>
                            <div className="flex" aria-label={`${review.rating} out of 5 stars`}>
                                {Array(5).fill('').map((_, index) => <StarIcon key={index} size={17} className="text-transparent" fill={review.rating >= index + 1 ? "#00C950" : "#D1D5DB"} />)}
                            </div>
                        </div>
                        <p className="mt-3 leading-6">{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
