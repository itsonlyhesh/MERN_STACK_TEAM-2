import { Link } from 'react-router-dom'
import { FiHeart, FiStar } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  return (
    <article className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_20px_45px_-25px_rgba(60,28,10,0.35)] transition hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#7c3a12]">
            {product.tag}
          </span>
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <Link to={`/product/${product.id}`} className="text-lg font-semibold text-stone-900 hover:text-[#7c3a12]">
            {product.name}
          </Link>
          <div className="flex items-center gap-1 text-amber-500">
            <FiStar size={15} />
            <span className="text-sm font-medium text-stone-700">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm leading-6 text-stone-600">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-semibold text-stone-900">${product.price}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                if (isInWishlist(product.id)) {
                  removeFromWishlist(product.id)
                } else {
                  addToWishlist(product)
                }
              }}
              className="rounded-full border border-stone-200 p-2 text-stone-600 transition hover:border-[#7c3a12] hover:text-[#7c3a12]"
            >
              <FiHeart className={isInWishlist(product.id) ? 'fill-[#7c3a12] text-[#7c3a12]' : ''} />
            </button>
            <button
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                addToCart(product)
              }}
              className="rounded-full bg-[#7c3a12] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5b2910]"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
