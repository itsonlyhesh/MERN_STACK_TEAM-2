import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTruck, FiShield, FiGift, FiSearch, FiStar, FiPackage } from 'react-icons/fi'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [query, setQuery] = useState('')

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase()

    if (!search) return products

    return products.filter((product) =>
      [product.name, product.description, product.tag].some((value) =>
        value.toLowerCase().includes(search),
      ),
    )
  }, [query])

  return (
    <main className="bg-[radial-gradient(circle_at_top_left,_rgba(247,233,217,0.7),_transparent_50%)]">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="mb-4 w-fit rounded-full border border-[#e8d0b2] bg-[#fff7eb] px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">
            Curated indulgence
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Discover handcrafted chocolate that feels like a luxury escape.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            From velvety truffles to bold dark chocolate bars, ChocoMart brings premium cocoa experiences straight to your door.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-3 shadow-sm">
            <FiSearch className="text-stone-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search truffles, gifts, hazelnut..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#7c3a12] px-6 py-3 font-semibold text-white transition hover:bg-[#5b2910]">
              Shop now <FiArrowRight />
            </Link>
            <Link to="/about" className="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-800 transition hover:border-[#7c3a12] hover:text-[#7c3a12]">
              Our story
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-stone-600">
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
              <FiTruck className="text-[#7c3a12]" /> Fast delivery
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
              <FiShield className="text-[#7c3a12]" /> Secure checkout
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
              <FiGift className="text-[#7c3a12]" /> Gift-ready boxes
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#f0dcc7] bg-[#fffdf9] p-4 shadow-[0_30px_70px_-20px_rgba(71,37,11,0.25)] sm:p-6">
          <div className="overflow-hidden rounded-[24px]">
            <img
              src="https://images.unsplash.com/photo-1584181350723-8ed9f5b2a2c2?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury chocolate assortment"
              className="h-[420px] w-full object-cover"
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#7c3a12] p-4 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-[#f7dfc2]">Signature</p>
              <p className="mt-2 text-xl font-semibold">Velvet Collection</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Seasonal</p>
              <p className="mt-2 text-xl font-semibold text-stone-900">Bespoke gifting</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Featured chocolates</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900">Hand-picked favorites</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-[#7c3a12]">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Best sellers</p>
            <h3 className="mt-3 text-2xl font-semibold text-stone-900">Most loved this month</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">Our signature truffles and hazelnut pralines are flying off the shelves.</p>
          </div>
          <div className="rounded-[28px] border border-stone-200 bg-[#fff7eb] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Premium chocolates</p>
            <h3 className="mt-3 text-2xl font-semibold text-stone-900">Crafted for connoisseurs</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">Rich couverture, slow-roasted nuts, and elegant textures in every bite.</p>
          </div>
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Chocolate gifts</p>
            <h3 className="mt-3 text-2xl font-semibold text-stone-900">Elegant boxes for every celebration</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">Curated packaging for birthdays, anniversaries, and heartfelt corporate gifts.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="rounded-[32px] border border-stone-200 bg-[#fffdf9] p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Customer reviews</p>
              <h2 className="mt-2 text-3xl font-semibold text-stone-900">Loved by chocolate lovers worldwide</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#fff7eb] px-4 py-2 text-sm font-semibold text-[#7c3a12]">
              <FiStar /> 4.9 average rating
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ['Mina K.', '“The truffle box looked stunning and tasted even better.”'],
              ['Owen R.', '“Every gift box arrived beautifully wrapped and premium.”'],
              ['Sofia P.', '“Their dark chocolate assortment is my new favorite.”'],
            ].map(([name, review]) => (
              <div key={name} className="rounded-[24px] border border-stone-200 bg-white p-5">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FiStar key={index} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-600">{review}</p>
                <p className="mt-4 font-semibold text-stone-900">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="rounded-[32px] bg-[#7c3a12] px-6 py-10 text-white shadow-[0_24px_60px_-25px_rgba(124,58,18,0.8)] sm:px-10 lg:px-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f7dfc2]">Newsletter</p>
              <h2 className="mt-2 text-3xl font-semibold">Join the ChocoMart club</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#fdf4e8]">
                Get first access to seasonal releases, exclusive gift bundles, and limited-edition chocolate drops.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input placeholder="Your email address" className="rounded-full border border-[#a45f2d] bg-[#ffffff14] px-4 py-3 outline-none placeholder:text-[#f3d8ba]" />
              <button className="rounded-full bg-white px-5 py-3 font-semibold text-[#7c3a12]">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white/70 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold text-stone-900">ChocoMart</p>
            <p className="mt-2 text-sm text-stone-600">Luxury chocolate, gift-ready packaging, and seamless delivery.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600">
            <Link to="/shop" className="transition hover:text-[#7c3a12]">Shop</Link>
            <Link to="/about" className="transition hover:text-[#7c3a12]">About</Link>
            <Link to="/cart" className="transition hover:text-[#7c3a12]">Cart</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
