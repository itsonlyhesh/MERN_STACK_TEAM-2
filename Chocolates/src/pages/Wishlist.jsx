import { Link } from 'react-router-dom'
import { FiHeart, FiTrash2 } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Wishlist</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">Your saved chocolates</h1>
        </div>
        <Link to="/shop" className="rounded-full bg-[#7c3a12] px-5 py-2.5 text-sm font-semibold text-white">
          Continue shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-[32px] border border-stone-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff4e5] text-[#7c3a12]">
            <FiHeart size={24} />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-stone-900">Your wishlist is empty</h2>
          <p className="mt-3 text-sm text-stone-600">Save your favorite chocolates and come back anytime.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((product) => (
            <div key={product.id} className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#7c3a12]">{product.brand}</p>
                  <h3 className="mt-1 text-lg font-semibold text-stone-900">{product.name}</h3>
                </div>
                <button onClick={() => removeFromWishlist(product.id)} className="rounded-full border border-stone-200 p-2 text-stone-600">
                  <FiTrash2 size={16} />
                </button>
              </div>
              <p className="mt-4 text-sm leading-7 text-stone-600">{product.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">Price</p>
                  <p className="text-lg font-semibold text-stone-900">${product.price.toFixed(2)}</p>
                </div>
                <Link to={`/product/${product.id}`} className="rounded-full bg-[#7c3a12] px-4 py-2 text-sm font-semibold text-white">
                  View product
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
