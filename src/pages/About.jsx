export default function About() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-[32px] border border-stone-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_0.8fr] lg:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Crafted with care</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">A premium chocolate destination for modern gifting.</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            ChocoMart blends artisan craftsmanship with polished digital shopping, offering box collections that feel as indulgent as they look.
          </p>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            Every order arrives beautifully wrapped, with thoughtful packaging designed for birthdays, celebrations, and corporate gifting.
          </p>
        </div>
        <div className="rounded-[24px] bg-[#fff7eb] p-6">
          <h2 className="text-xl font-semibold text-stone-900">Why shoppers choose us</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
            <li>• Premium ingredients sourced from renowned cacao regions</li>
            <li>• Seasonal and limited-edition flavor drops</li>
            <li>• Responsive service and gift-ready presentation</li>
            <li>• Secure local cart persistence for easy return visits</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
