import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiCreditCard, FiDollarSign, FiMapPin, FiTruck } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const paymentMethods = ['Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery']

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart, getSubtotal, getDiscount, getDeliveryCharge, getGrandTotal } = useCart()
  const [selectedPayment, setSelectedPayment] = useState('Credit Card')
  const [submitted, setSubmitted] = useState(false)

  const hasItems = items.length > 0

  const deliveryLabel = useMemo(() => {
    if (getDeliveryCharge === 0) return 'Free delivery'
    return 'Express delivery'
  }, [getDeliveryCharge])

  const handleSubmit = (event) => {
    event.preventDefault()
    const orderId = `CM-${Math.floor(100000 + Math.random() * 900000)}`
    const estimatedDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

    localStorage.setItem(
      'chocomart-order',
      JSON.stringify({
        orderId,
        items: items.map((item) => ({ ...item })),
        estimatedDeliveryDate,
      }),
    )

    setSubmitted(true)
    clearCart()
    window.setTimeout(() => navigate('/order-success'), 1200)
  }

  if (!hasItems) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Checkout unavailable</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-900">Your cart is empty.</h1>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-[#7c3a12] px-6 py-3 font-semibold text-white">
            Continue shopping
          </Link>
        </div>
      </main>
    )
  }

  if (submitted) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-stone-200 bg-white p-10 text-center shadow-sm">
          <FiCheckCircle className="mx-auto text-[#16784c]" size={48} />
          <h1 className="mt-4 text-3xl font-semibold text-stone-900">Payment successful!</h1>
          <p className="mt-3 text-stone-600">Your chocolate order is confirmed and will be delivered soon.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Checkout</p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-900">Complete your order</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#7c3a12]">
              <FiMapPin />
              <h2 className="text-xl font-semibold text-stone-900">Shipping address</h2>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input required placeholder="Full name" className="rounded-full border border-stone-200 px-4 py-3 outline-none" />
              <input required placeholder="Phone number" className="rounded-full border border-stone-200 px-4 py-3 outline-none" />
              <input required placeholder="Address line 1" className="md:col-span-2 rounded-full border border-stone-200 px-4 py-3 outline-none" />
              <input placeholder="Apartment / Suite" className="rounded-full border border-stone-200 px-4 py-3 outline-none" />
              <input required placeholder="City" className="rounded-full border border-stone-200 px-4 py-3 outline-none" />
              <input required placeholder="Postal code" className="rounded-full border border-stone-200 px-4 py-3 outline-none" />
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#7c3a12]">
              <FiTruck />
              <h2 className="text-xl font-semibold text-stone-900">Delivery details</h2>
            </div>
            <div className="mt-5 rounded-[24px] border border-stone-200 bg-[#fffaf3] p-4 text-sm text-stone-600">
              <p className="font-semibold text-stone-900">{deliveryLabel}</p>
              <p className="mt-2">Estimated arrival: 2–3 business days inside your city.</p>
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#7c3a12]">
              <FiCreditCard />
              <h2 className="text-xl font-semibold text-stone-900">Payment method</h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {paymentMethods.map((method) => (
                <label key={method} className={`flex cursor-pointer items-center justify-between rounded-[20px] border px-4 py-3 ${selectedPayment === method ? 'border-[#7c3a12] bg-[#fff7eb]' : 'border-stone-200'}`}>
                  <span className="font-medium text-stone-800">{method}</span>
                  <input type="radio" name="payment" value={method} checked={selectedPayment === method} onChange={() => setSelectedPayment(method)} className="accent-[#7c3a12]" />
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="rounded-[28px] border border-stone-200 bg-[#fffdf9] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#7c3a12]">
            <FiDollarSign />
            <h2 className="text-xl font-semibold text-stone-900">Order summary</h2>
          </div>
          <div className="mt-5 space-y-3 text-sm text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="font-semibold text-[#16784c]">-${getDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{getDeliveryCharge === 0 ? 'Free' : `$${getDeliveryCharge.toFixed(2)}`}</span>
            </div>
          </div>
          <div className="mt-6 border-t border-stone-200 pt-4">
            <div className="flex items-center justify-between text-lg font-semibold text-stone-900">
              <span>Grand total</span>
              <span>${getGrandTotal.toFixed(2)}</span>
            </div>
            <button type="submit" className="mt-6 w-full rounded-full bg-[#7c3a12] px-4 py-3 font-semibold text-white transition hover:bg-[#5b2910]">
              Pay now with {selectedPayment}
            </button>
          </div>
        </aside>
      </form>
    </main>
  )
}
