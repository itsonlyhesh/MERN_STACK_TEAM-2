import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) return

    const profile = JSON.parse(localStorage.getItem('chocomart-profile') || '{}')
    if (!profile.email) {
      setErrors({ email: 'No account found for this email. Please register first.' })
      return
    }

    localStorage.setItem('chocomart-auth', JSON.stringify({ email: form.email }))
    navigate('/profile')
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-[32px] border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Welcome back</p>
        <h1 className="mt-3 text-3xl font-semibold text-stone-900">Login to ChocoMart</h1>
        <p className="mt-3 text-sm leading-7 text-stone-600">Access your orders, saved addresses, and custom chocolate favorites.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="Email"
              className="w-full rounded-full border border-stone-200 px-4 py-3 outline-none"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Password"
              className="w-full rounded-full border border-stone-200 px-4 py-3 outline-none"
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full rounded-full bg-[#7c3a12] px-4 py-3 font-semibold text-white">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          New here?{' '}
          <Link to="/register" className="font-semibold text-[#7c3a12]">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}
