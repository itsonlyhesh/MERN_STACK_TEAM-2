import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FiShoppingBag, FiMenu, FiHeart, FiSearch, FiChevronDown } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function Navbar() {
  const { getTotalItems } = useCart()
  const { wishlistCount } = useWishlist()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchValue = searchParams.get('search') ?? ''

  const handleSearch = (value) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value.trim()) {
      nextParams.set('search', value)
    } else {
      nextParams.delete('search')
    }

    setSearchParams(nextParams)

    if (location.pathname !== '/shop') {
      navigate(`/shop${nextParams.toString() ? `?${nextParams.toString()}` : ''}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fffdf9]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7c3a12] text-lg font-semibold text-white">
            C
          </div>
          <div>
            <p className="text-lg font-semibold text-stone-900">ChocoMart</p>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Premium Chocolate</p>
          </div>
        </Link>

        <div className="hidden flex-1 items-center gap-3 md:flex">
          <label className="flex flex-1 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 shadow-sm">
            <FiSearch className="text-stone-500" />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search chocolates"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-stone-400"
            />
          </label>

          <label className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-600 shadow-sm">
            <select className="bg-transparent pr-6 outline-none">
              <option>All Categories</option>
              <option>Dark Chocolate</option>
              <option>Milk Chocolate</option>
              <option>Truffles</option>
              <option>Gifts</option>
            </select>
            <FiChevronDown className="pointer-events-none" />
          </label>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-700 md:flex">
          <Link to="/" className="transition hover:text-[#7c3a12]">Home</Link>
          <Link to="/shop" className="transition hover:text-[#7c3a12]">Shop</Link>
          <Link to="/about" className="transition hover:text-[#7c3a12]">About</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden rounded-full bg-[#7c3a12] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5b2910] sm:inline-flex">
            Login
          </Link>
          <Link to="/wishlist" className="relative rounded-full border border-stone-200 p-2.5 text-stone-700 transition hover:border-[#7c3a12] hover:text-[#7c3a12]">
            <FiHeart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-semibold text-stone-900">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative rounded-full bg-[#7c3a12] p-2.5 text-white shadow-sm transition hover:bg-[#5b2910]">
            <FiShoppingBag size={18} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-semibold text-stone-900">
              {getTotalItems}
            </span>
          </Link>
          <button className="rounded-full border border-stone-200 p-2.5 text-stone-700 md:hidden">
            <FiMenu size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
