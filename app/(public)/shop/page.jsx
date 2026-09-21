'use client'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import { ArrowLeft, PackageSearch } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

 function ShopContent() {

    // get query params ?search=abc
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const products = useSelector(state => state.product.list)

    const filteredProducts = search
        ? products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        : products;

    return (
        <main className="mx-4 min-h-[70vh] sm:mx-6">
            <div className="mx-auto max-w-7xl pb-28 pt-10 sm:pt-14">
                <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-700">Storage catalogue</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                            {search ? 'Search results' : 'All products'}
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                            {search
                                ? `${filteredProducts.length} result${filteredProducts.length === 1 ? '' : 's'} for “${search}”`
                                : 'Browse health-checked storage for CCTV, DVR, NVR, desktop, and laptop systems.'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        {search && <Link href="/shop" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"><ArrowLeft size={16} /> All products</Link>}
                        <span className="rounded-full bg-slate-100 px-4 py-2">{filteredProducts.length} listed</span>
                    </div>
                </header>

                {filteredProducts.length > 0 ? (
                    <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                    </div>
                ) : (
                    <div className="mt-10 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
                        <PackageSearch className="text-slate-400" size={32} />
                        <h2 className="mt-5 text-lg font-semibold text-slate-900">No products found</h2>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Try a different product name or return to the complete storage catalogue.</p>
                        <Link href="/shop" className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">View all products</Link>
                    </div>
                )}
            </div>
        </main>
    )
}


export default function Shop() {
  return (
    <Suspense fallback={<div className="mx-auto min-h-[70vh] max-w-7xl px-6 py-14 text-sm text-slate-500">Loading catalogue…</div>}>
      <ShopContent />
    </Suspense>
  );
}
