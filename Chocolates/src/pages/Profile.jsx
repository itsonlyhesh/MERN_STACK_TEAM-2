import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('chocomart-profile') || 'null')
    setProfile(storedProfile)
  }, [])

  if (!profile) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Profile unavailable</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-900">Please log in to view your profile.</h1>
          <Link to="/login" className="mt-6 inline-flex rounded-full bg-[#7c3a12] px-6 py-3 font-semibold text-white">
            Login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">My account</p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-900">Welcome, {profile.name}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900">Profile details</h2>
          <div className="mt-5 space-y-3 text-sm text-stone-600">
            <p><span className="font-semibold text-stone-900">Name:</span> {profile.name}</p>
            <p><span className="font-semibold text-stone-900">Email:</span> {profile.email}</p>
            <p><span className="font-semibold text-stone-900">Phone:</span> {profile.phone}</p>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900">Order history</h2>
            <div className="mt-5 space-y-3">
              {profile.orders?.map((order) => (
                <div key={order.id} className="rounded-[20px] border border-stone-200 bg-[#fffaf3] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-stone-900">{order.id}</p>
                    <span className="rounded-full bg-[#e9f7ee] px-3 py-1 text-sm font-semibold text-[#16784c]">{order.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-stone-600">Total: {order.total}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900">Saved addresses</h2>
            <div className="mt-5 space-y-3">
              {profile.addresses?.map((address) => (
                <div key={address} className="rounded-[20px] border border-stone-200 bg-[#fffaf3] p-4 text-sm text-stone-600">
                  {address}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
