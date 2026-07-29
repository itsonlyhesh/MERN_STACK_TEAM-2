import { useEffect } from 'react'

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 2600)
    return () => window.clearTimeout(timer)
  }, [onClose])

  const classes = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    error: 'border-red-200 bg-red-50 text-red-700',
    info: 'border-[#e7c89b] bg-[#fff7eb] text-[#5d2e0a]',
  }

  return (
    <div className={`fixed right-4 top-20 z-[100] rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${classes[type]}`}>
      {message}
    </div>
  )
}
