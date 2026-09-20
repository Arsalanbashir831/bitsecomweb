'use client'
import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"

const AdminLayout = ({ children }) => {

    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/session')
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                setSession(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return loading ? (
        <Loading />
    ) : session?.authenticated ? (
        <div className="flex flex-col h-screen">
            <AdminNavbar username={session.username} />
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <AdminSidebar username={session.username} />
                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">You are not authorized to access this page</h1>
            <Link href="/admin/login" className="bg-slate-700 text-white flex items-center gap-2 mt-8 p-2 px-6 max-sm:text-sm rounded-full">
                Admin login <ArrowRightIcon size={18} />
            </Link>
        </div>
    )
}

export default AdminLayout
