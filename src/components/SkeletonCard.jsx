export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[28px] border border-stone-200/80 bg-white/80 shadow-[0_20px_45px_-25px_rgba(60,28,10,0.35)]">
      <div className="h-56 bg-stone-200" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-2/3 rounded bg-stone-200" />
        <div className="h-4 w-full rounded bg-stone-200" />
        <div className="h-4 w-5/6 rounded bg-stone-200" />
        <div className="h-10 w-full rounded-full bg-stone-200" />
      </div>
    </div>
  )
}
