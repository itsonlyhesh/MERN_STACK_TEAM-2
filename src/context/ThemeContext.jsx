import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('chocomart-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('chocomart-theme', theme)
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')) }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
