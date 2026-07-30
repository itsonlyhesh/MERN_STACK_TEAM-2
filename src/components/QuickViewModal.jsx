import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiX, FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [imgSrc, setImgSrc] = useState(product?.image)

  useEffect(() => {
    if (product) {
      setImgSrc(product.image)
    }
  }, [product])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  const originalPrice = product.price
  const discountedPrice = product.discount
    ? (originalPrice * (1 - product.discount / 100)).toFixed(2)
    : originalPrice.toFixed(2)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}
        size={16}
      />
    ))
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl rounded-[32px] bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-2 shadow-lg transition hover:bg-stone-100"
        >
          <FiX size={18} />
        </button>

        <div className="grid gap-0 md:grid-cols-[1fr_1.2fr]">
          {/* Image */}
          <div className="overflow-hidden rounded-l-[32px] bg-[#fffaf3] p-6">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src={imgSrc}
                alt={product.name}
                className="h-72 w-full object-cover transition-transform duration-500 hover:scale-110 md:h-80"
                onError={() => setImgSrc('https://via.placeholder.com/400x400?text=ChocoMart')}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="mt-4 flex gap-2">
                {product.images.slice(0, 3).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgSrc(img)}
                    className={`overflow-hidden rounded-xl border-2 transition ${
                      imgSrc === img ? 'border-[#7c3a12]' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-14 w-14 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between p-6 md:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#fff7eb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7c3a12]">
                  {product.tag}
                </span>
                <span className="text-sm font-medium text-stone-500">{product.brand}</span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold text-stone-900">{product.name}</h2>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm font-medium text-stone-600">
                  {product.rating}
                </span>
                {product.reviewCount && (
                  <span className="text-sm text-stone-500">({product.reviewCount.toLocaleString()} reviews)</span>
                )}
              </div>

              <p className="mt-4 text-sm leading-7 text-stone-600 line-clamp-3">{product.description}</p>

              <div className="mt-6 flex items-center gap-3">
                <span className="text-2xl font-bold text-stone-900">${discountedPrice}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-stone-400 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-sm font-semibold text-emerald-700">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {product.stockStatus && (
                <p className="mt-3 text-sm font-medium text-stone-600">
                  Status: <span className="text-emerald-600">{product.stockStatus}</span>
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  addToCart(product)
                  onClose()
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#7c3a12] px-5 py-3 font-semibold text-white transition hover:bg-[#5b2910]"
              >
                <FiShoppingCart size={16} />
                Add to cart
              </button>
              <button
                onClick={() => {
                  if (isInWishlist(product.id)) {
                    removeFromWishlist(product.id)
                  } else {
                    addToWishlist(product)
                  }
                }}
                className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 font-semibold transition ${
                  isInWishlist(product.id)
                    ? 'border-[#7c3a12] text-[#7c3a12]'
                    : 'border-stone-300 text-stone-800 hover:border-[#7c3a12] hover:text-[#7c3a12]'
                }`}
              >
                <FiHeart
                  size={16}
                  className={isInWishlist(product.id) ? 'fill-[#7c3a12]' : ''}
                />
                {isInWishlist(product.id) ? 'Saved' : 'Wishlist'}
              </button>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-5 py-3 font-semibold text-stone-800 transition hover:border-[#7c3a12] hover:text-[#7c3a12]"
              >
                <FiEye size={16} />
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
