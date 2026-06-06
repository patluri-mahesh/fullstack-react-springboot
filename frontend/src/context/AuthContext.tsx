import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { AuthResponse } from '../types'

interface AuthContextType {
  user: AuthResponse | null
  token: string | null
  login: (authData: AuthResponse) => void
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (authData: AuthResponse) => {
    setToken(authData.token)
    setUser(authData)
    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', JSON.stringify(authData))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{
      user, token,
      login, logout,
      isAuthenticated: !!token,
      isAdmin: user?.role === 'ROLE_ADMIN'
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}