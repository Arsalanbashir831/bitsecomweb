'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LockKeyholeIcon } from "lucide-react"
import bitsLogo from "@/assets/bits_logo.png"

export default function AdminLogin() {

    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError('')

        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
            router.push('/admin')
            router.refresh()
        } else {
            const data = await response.json().catch(() => ({}))
            setError(data.error || 'Login failed')
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-8 flex flex-col gap-5 shadow-sm">
                <Image src={bitsLogo} alt="BITS Pakistan" className="h-10 w-auto object-contain mx-auto" width={160} height={40} />
                <p className="text-center text-sm text-slate-500">Sign in to the admin panel</p>

                <div className="flex flex-col gap-1.5 text-sm">
                    <label htmlFor="username" className="text-slate-600">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 transition"
                        required
                        autoFocus
                    />
                </div>

                <div className="flex flex-col gap-1.5 text-sm">
                    <label htmlFor="password" className="text-slate-600">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 transition"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 transition text-white rounded-lg px-4 py-2.5 text-sm font-medium"
                >
                    <LockKeyholeIcon size={16} />
                    {submitting ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
        </div>
    )
}
