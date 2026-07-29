import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCheckCircle, FiPackage, FiCalendar } from 'react-icons/fi'

export default function OrderSuccess() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    try {
      const storedOrder = JSON.parse(localStorage.getItem('chocomart-order') || 'null')
      setOrder(storedOrder)
    } catch {
      setOrder(null)
    }
  }, [])

  const deliveryLabel = useMemo(() => {
    if (!order?.estimatedDeliveryDate) return 'Soon'
    return order.estimatedDeliveryDate
  }, [order])

  if (!order) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">No order found</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-900">Your order details are unavailable.</h1>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-[#7c3a12] px-6 py-3 font-semibold text-white">
            Continue shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-stone-200 bg-white p-8 shadow-sm lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[#16784c]">
              <FiCheckCircle size={28} />
              <p className="text-sm font-semibold uppercase tracking-[0.3em]">Order confirmed</p>
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-stone-900">Thank you for your order!</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-stone-600">
              Your premium chocolates are being prepared and will be on their way shortly.
            </p>
          </div>
          <div className="rounded-[24px] bg-[#fff7eb] px-5 py-4 text-sm font-semibold text-[#7c3a12]">
            Order ID: {order.orderId}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[24px] border border-stone-200 bg-[#fffaf3] p-6">
            <div className="flex items-center gap-2 text-[#7c3a12]">
              <FiPackage />
              <h2 className="text-xl font-semibold text-stone-900">Products purchased</h2>
            </div>
            <div className="mt-5 space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-[18px] bg-white px-4 py-3">
                  <div>
                    <p className="font-semibold text-stone-900">{item.name}</p>
                    <p className="text-sm text-stone-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-stone-200 bg-white p-6">
            <div className="flex items-center gap-2 text-[#7c3a12]">
              <FiCalendar />
              <h2 className="text-xl font-semibold text-stone-900">Estimated delivery date</h2>
            </div>
            <p className="mt-5 text-2xl font-semibold text-stone-900">{deliveryLabel}</p>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              Your order will be delivered within 2–3 business days using trusted premium shipping.
            </p>
            <div className="mt-6">
              <Link to="/shop" className="inline-flex rounded-full bg-[#7c3a12] px-6 py-3 font-semibold text-white">
                Shop again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
