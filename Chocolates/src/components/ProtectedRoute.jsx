import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const auth = JSON.parse(localStorage.getItem('chocomart-auth') || 'null')
  const profile = JSON.parse(localStorage.getItem('chocomart-profile') || 'null')

  if (!auth || !profile) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && profile.role !== 'Admin') {
    return <Navigate to="/profile" replace />
  }

  return children
}
