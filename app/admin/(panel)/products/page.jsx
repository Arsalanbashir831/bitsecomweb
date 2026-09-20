'use client'

import { categories } from "@/assets/assets"
import Loading from "@/components/Loading"
import { LoaderCircleIcon, PencilIcon, PlusIcon, Trash2Icon, UploadIcon, XIcon } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

const emptyForm = {
    name: '',
    description: '',
    category: '',
    mrp: '',
    price: '',
    inStock: true,
    storeId: '',
    images: [],
}

export default function AdminProducts() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [products, setProducts] = useState(null)
    const [stores, setStores] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const fileInputRef = useRef(null)

    const fetchProducts = useCallback(async () => {
        const response = await fetch('/api/admin/products')
        const data = await response.json()
        setProducts(data.products ?? [])
    }, [])

    useEffect(() => {
        fetchProducts()
        fetch('/api/admin/stores')
            .then((res) => res.json())
            .then((data) => setStores(data.stores ?? []))
    }, [fetchProducts])

    const openAdd = () => {
        setForm(emptyForm)
        setEditingId(null)
        setModalOpen(true)
    }

    const openEdit = (product) => {
        setForm({
            name: product.name,
            description: product.description,
            category: product.category,
            mrp: String(product.mrp),
            price: String(product.price),
            inStock: product.inStock,
            storeId: product.storeId,
            images: [...product.images],
        })
        setEditingId(product.id)
        setModalOpen(true)
    }

    const handleFiles = async (e) => {
        const files = Array.from(e.target.files || [])
        e.target.value = ''
        if (files.length === 0) return

        const formData = new FormData()
        files.forEach((file) => formData.append('files', file))

        setUploading(true)
        const response = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        const data = await response.json()
        setUploading(false)

        if (!response.ok) return toast.error(data.error || 'Upload failed')
        setForm((prev) => ({ ...prev, images: [...prev.images, ...data.urls] }))
    }

    const removeImage = (url) => {
        setForm((prev) => ({ ...prev, images: prev.images.filter((image) => image !== url) }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        const payload = { ...form, mrp: Number(form.mrp), price: Number(form.price) }
        const response = editingId
            ? await fetch(`/api/admin/products/${editingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            : await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

        const data = await response.json()
        setSaving(false)

        if (!response.ok) return toast.error(data.error || 'Could not save product')
        toast.success(editingId ? 'Product updated' : 'Product added')
        setModalOpen(false)
        fetchProducts()
    }

    const handleDelete = async (product) => {
        if (!window.confirm(`Delete "${product.name}"? Its uploaded images will also be removed.`)) return
        const response = await fetch(`/api/admin/products/${product.id}`, { method: 'DELETE' })
        if (!response.ok) return toast.error('Could not delete product')
        toast.success('Product deleted')
        fetchProducts()
    }

    if (products === null) return <Loading />

    return (
        <div className="text-slate-500">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl">Product <span className="text-slate-800 font-medium">Listing</span></h1>
                <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition text-white text-sm rounded-full px-5 py-2.5">
                    <PlusIcon size={17} />
                    Add Product
                </button>
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-slate-300 rounded-xl py-24 mt-8 text-sm">
                    <p>No products yet. Add your first product to see it here.</p>
                </div>
            ) : (
                <div className="mt-8 border border-slate-200 rounded-xl overflow-x-auto">
                    <table className="w-full text-sm min-w-150">
                        <thead>
                            <tr className="border-b border-slate-200 text-left text-slate-600">
                                <th className="p-4 font-medium">Product</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Stock</th>
                                <th className="p-4 font-medium">Store</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Image src={product.images[0]} alt="" width={80} height={80} className="size-12 rounded-lg object-cover bg-slate-100" />
                                            <div>
                                                <p className="text-slate-700 font-medium">{product.name}</p>
                                                <p className="text-xs text-slate-400 line-clamp-1 max-w-60">{product.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">{product.category}</td>
                                    <td className="p-4">
                                        <p className="text-slate-700">{currency}{product.price}</p>
                                        <p className="text-xs text-slate-400 line-through">{currency}{product.mrp}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-xs px-2.5 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                            {product.inStock ? 'In stock' : 'Out of stock'}
                                        </span>
                                    </td>
                                    <td className="p-4">{product.store?.name || '—'}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEdit(product)} className="p-2 rounded-full hover:bg-slate-200 transition" title="Edit">
                                                <PencilIcon size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(product)} className="p-2 rounded-full hover:bg-red-100 text-red-500 transition" title="Delete">
                                                <Trash2Icon size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add / Edit modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg text-slate-800 font-medium">{editingId ? 'Edit Product' : 'Add Product'}</h2>
                            <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition">
                                <XIcon size={18} />
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-slate-600">Product name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 transition"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-slate-600">Description</label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 transition resize-none"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-slate-600">Category</label>
                                <input
                                    type="text"
                                    list="product-categories"
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 transition"
                                    required
                                />
                                <datalist id="product-categories">
                                    {categories.map((category) => <option key={category} value={category} />)}
                                </datalist>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-slate-600">Store</label>
                                <select
                                    value={form.storeId}
                                    onChange={(e) => setForm({ ...form, storeId: e.target.value })}
                                    className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 transition bg-white"
                                    required
                                >
                                    <option value="">Select store</option>
                                    {stores.map((store) => (
                                        <option key={store.id} value={store.id}>{store.name} (@{store.username})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-slate-600">MRP ({currency})</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.mrp}
                                    onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                                    className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 transition"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-slate-600">Selling price ({currency})</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-green-500 transition"
                                    required
                                />
                            </div>
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                checked={form.inStock}
                                onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                                className="size-4 accent-green-600"
                            />
                            In stock
                        </label>

                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-slate-600">Images</p>
                            <div className="flex flex-wrap gap-3">
                                {form.images.map((url) => (
                                    <div key={url} className="relative">
                                        <Image src={url} alt="" width={160} height={160} className="size-20 rounded-lg object-cover bg-slate-100 border border-slate-200" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(url)}
                                            className="absolute -top-2 -right-2 bg-slate-700 text-white rounded-full p-1 hover:bg-red-500 transition"
                                            title="Remove image"
                                        >
                                            <XIcon size={12} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="size-20 rounded-lg border border-dashed border-slate-300 hover:border-green-500 hover:text-green-600 transition flex flex-col items-center justify-center gap-1 text-slate-400"
                                >
                                    {uploading ? <LoaderCircleIcon size={18} className="animate-spin" /> : <UploadIcon size={18} />}
                                    <span className="text-[10px]">Upload</span>
                                </button>
                                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" multiple hidden onChange={handleFiles} />
                            </div>
                            {form.images.length === 0 && <p className="text-xs text-red-500">At least one image is required.</p>}
                        </div>

                        {stores.length === 0 && (
                            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
                                No stores exist yet. A product must belong to a store — create or approve a store first.
                            </p>
                        )}

                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setModalOpen(false)} className="text-sm text-slate-600 border border-slate-200 hover:border-slate-300 rounded-full px-6 py-2.5 transition">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving || uploading || form.images.length === 0 || stores.length === 0}
                                className="text-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-60 rounded-full px-6 py-2.5 transition"
                            >
                                {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
