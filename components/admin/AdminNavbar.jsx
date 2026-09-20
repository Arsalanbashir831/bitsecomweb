'use client'
import Image from "next/image"
import Link from "next/link"
import { LogOutIcon } from "lucide-react"
import bitsLogo from "@/assets/bits_logo.png"

const AdminNavbar = ({ username }) => {

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' })
        window.location.assign('/admin/login')
    }

    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/admin" className="flex items-center gap-3">
                <Image src={bitsLogo} alt="BITS Pakistan" className="h-8 w-auto object-contain" width={128} height={32} />
                <span className="text-xs font-semibold px-3 p-0.5 rounded-full text-white bg-green-500">Admin</span>
            </Link>
            <div className="flex items-center gap-4">
                <p className="text-sm text-slate-600">Hi, {username || 'Admin'}</p>
                <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 rounded-full px-4 py-1.5 transition">
                    <LogOutIcon size={15} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default AdminNavbar
