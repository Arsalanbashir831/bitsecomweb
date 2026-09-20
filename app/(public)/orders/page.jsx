import Link from "next/link"

export default function Orders() {
    return (
        <main className="min-h-[80vh] mx-6 flex flex-col items-center justify-center text-center text-slate-500">
            <h1 className="text-2xl sm:text-4xl font-semibold text-slate-700">You have no orders</h1>
            <p className="mt-3 text-sm sm:text-base">Your completed purchases will appear here.</p>
            <Link href="/shop" className="mt-7 rounded-full bg-slate-800 px-6 py-2.5 text-sm text-white transition hover:bg-slate-900">
                Browse storage drives
            </Link>
        </main>
    )
}
