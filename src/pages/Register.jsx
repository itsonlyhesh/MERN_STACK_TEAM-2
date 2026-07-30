import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!/^\d{10}$/.test(form.phone)) nextErrors.phone = 'Phone must be 10 digits.'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) return

    const profile = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      addresses: ['12 Cocoa Lane, London'],
      orders: [
        { id: 'CM-1001', status: 'Delivered', total: '$48.00' },
      ],
    }

    localStorage.setItem('chocomart-profile', JSON.stringify(profile))
    localStorage.setItem('chocomart-auth', JSON.stringify({ email: form.email }))
    navigate('/profile')
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-[32px] border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Create account</p>
        <h1 className="mt-3 text-3xl font-semibold text-stone-900">Register at ChocoMart</h1>
        <p className="mt-3 text-sm leading-7 text-stone-600">Open an account to track your orders and save your addresses.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Name" className="w-full rounded-full border border-stone-200 px-4 py-3 outline-none" />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" className="w-full rounded-full border border-stone-200 px-4 py-3 outline-none" />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone" className="w-full rounded-full border border-stone-200 px-4 py-3 outline-none" />
            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Password" className="w-full rounded-full border border-stone-200 px-4 py-3 outline-none" />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>
          <div>
            <input type="password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} placeholder="Confirm Password" className="w-full rounded-full border border-stone-200 px-4 py-3 outline-none" />
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full rounded-full bg-[#7c3a12] px-4 py-3 font-semibold text-white">
              Register
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#7c3a12]">
            Login here
          </Link>
        </p>
      </div>
    </main>
  )
}
