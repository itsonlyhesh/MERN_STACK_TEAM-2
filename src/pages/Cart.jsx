import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, getSubtotal, getDiscount, getDeliveryCharge, getGrandTotal } = useCart()

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Cart empty</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-900">Your luxury box is waiting</h1>
          <p className="mt-4 max-w-md text-stone-600">Add a few signature chocolates to your bag and come back anytime — your cart stays saved locally.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-[#7c3a12] px-6 py-3 font-semibold text-white transition hover:bg-[#5b2910]">
            Continue shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Your cart</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">Ready for checkout</h1>
        </div>
        <button onClick={clearCart} className="text-sm font-semibold text-stone-600 transition hover:text-[#7c3a12]">
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-[24px] border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                <div>
                  <h2 className="font-semibold text-stone-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-stone-600">{item.description}</p>
                  <p className="mt-2 text-sm font-semibold text-[#7c3a12]">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center rounded-full border border-stone-200">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-stone-700">
                    <FiMinus size={15} />
                  </button>
                  <span className="min-w-8 text-center font-semibold text-stone-900">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-stone-700">
                    <FiPlus size={15} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="rounded-full p-2 text-stone-500 transition hover:bg-stone-100 hover:text-[#7c3a12]">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[28px] border border-stone-200 bg-[#fffdf9] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Order summary</p>
          <div className="mt-6 space-y-3 text-sm text-stone-600">
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
            <div className="flex justify-between">
              <span>Estimated tax</span>
              <span>$0.00</span>
            </div>
          </div>
          <div className="mt-6 border-t border-stone-200 pt-4">
            <div className="flex items-center justify-between text-lg font-semibold text-stone-900">
              <span>Grand total</span>
              <span>${getGrandTotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="mt-6 block w-full rounded-full bg-[#7c3a12] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#5b2910]">
              Checkout
            </Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
