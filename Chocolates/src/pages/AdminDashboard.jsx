import { useMemo, useState } from 'react'
import { adminOrders, adminProducts, adminUsers } from '../data/adminData'

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered']

export default function AdminDashboard() {
  const [products, setProducts] = useState(adminProducts)
  const [orders, setOrders] = useState(adminOrders)
  const [users] = useState(adminUsers)
  const [draft, setDraft] = useState({ id: null, name: '', brand: '', category: '', price: '', stock: '', featured: false })
  const [editingId, setEditingId] = useState(null)

  const totals = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    return {
      products: products.length,
      orders: orders.length,
      revenue: totalRevenue.toFixed(2),
      users: users.length,
    }
  }, [orders, products, users])

  const resetDraft = () => {
    setDraft({ id: null, name: '', brand: '', category: '', price: '', stock: '', featured: false })
    setEditingId(null)
  }

  const handleSaveProduct = (event) => {
    event.preventDefault()

    const payload = {
      id: editingId ?? Date.now(),
      name: draft.name,
      brand: draft.brand,
      category: draft.category,
      price: Number(draft.price),
      stock: Number(draft.stock),
      featured: draft.featured,
    }

    if (editingId) {
      setProducts((current) => current.map((item) => (item.id === editingId ? payload : item)))
    } else {
      setProducts((current) => [payload, ...current])
    }

    resetDraft()
  }

  const handleEditProduct = (product) => {
    setEditingId(product.id)
    setDraft({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      stock: product.stock,
      featured: product.featured,
    })
  }

  const handleDeleteProduct = (productId) => {
    setProducts((current) => current.filter((product) => product.id !== productId))
  }

  const handleStatusChange = (orderId, status) => {
    setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Admin panel</p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-900">ChocoMart Dashboard</h1>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Products', value: totals.products },
          { label: 'Total Orders', value: totals.orders },
          { label: 'Total Revenue', value: `$${totals.revenue}` },
          { label: 'Total Users', value: totals.users },
        ].map((card) => (
          <div key={card.label} className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">{card.label}</p>
            <p className="mt-3 text-2xl font-semibold text-stone-900">{card.value}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-stone-900">Product management</h2>
              <p className="text-sm text-stone-600">Add, edit, and remove chocolates from the catalog.</p>
            </div>
            <button onClick={resetDraft} className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700">
              {editingId ? 'Cancel edit' : 'New product'}
            </button>
          </div>

          <form onSubmit={handleSaveProduct} className="mb-6 grid gap-3 rounded-[24px] border border-stone-200 bg-[#fffaf3] p-4 md:grid-cols-2">
            <input required value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Product name" className="rounded-full border border-stone-200 bg-white px-4 py-2.5 outline-none" />
            <input required value={draft.brand} onChange={(event) => setDraft({ ...draft, brand: event.target.value })} placeholder="Brand" className="rounded-full border border-stone-200 bg-white px-4 py-2.5 outline-none" />
            <input required value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} placeholder="Category" className="rounded-full border border-stone-200 bg-white px-4 py-2.5 outline-none" />
            <input required type="number" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} placeholder="Price" className="rounded-full border border-stone-200 bg-white px-4 py-2.5 outline-none" />
            <input required type="number" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: event.target.value })} placeholder="Stock" className="rounded-full border border-stone-200 bg-white px-4 py-2.5 outline-none" />
            <label className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700">
              <input type="checkbox" checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} />
              Featured product
            </label>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="rounded-full bg-[#7c3a12] px-5 py-2.5 font-semibold text-white">{editingId ? 'Update product' : 'Add product'}</button>
            </div>
          </form>

          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col gap-3 rounded-[20px] border border-stone-200 bg-[#fffaf3] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-stone-900">{product.name}</p>
                  <p className="text-sm text-stone-600">{product.brand} • {product.category}</p>
                  <p className="mt-1 text-sm text-stone-500">Price: ${product.price} • Stock: {product.stock}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditProduct(product)} className="rounded-full border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-700">Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="rounded-full bg-red-600 px-3 py-2 text-sm font-semibold text-white">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900">Order management</h2>
            <div className="mt-5 space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="rounded-[20px] border border-stone-200 bg-[#fffaf3] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-stone-900">{order.id}</p>
                      <p className="text-sm text-stone-600">{order.customer}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#7c3a12]">${order.total}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <select value={order.status} onChange={(event) => handleStatusChange(order.id, event.target.value)} className="rounded-full border border-stone-200 bg-white px-3 py-2 text-sm outline-none">
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <span className="text-sm text-stone-500">{order.items} items</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900">User management</h2>
            <div className="mt-5 space-y-3">
              {users.map((user) => (
                <div key={user.id} className="rounded-[20px] border border-stone-200 bg-[#fffaf3] p-4">
                  <p className="font-semibold text-stone-900">{user.name}</p>
                  <p className="text-sm text-stone-600">{user.email}</p>
                  <p className="mt-1 text-sm text-stone-500">Role: {user.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
