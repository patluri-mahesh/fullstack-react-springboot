import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface Props {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly = false }: Props) {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />

  return <>{children}</>
}