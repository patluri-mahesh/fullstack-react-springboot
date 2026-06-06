import api from './axios'
import type { ApiResponse, AuthResponse, LoginForm, RegisterForm } from '../types'

export const login = async (data: LoginForm): Promise<AuthResponse> => {
  const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', data)
  return res.data.data
}

export const register = async (data: RegisterForm): Promise<AuthResponse> => {
  const res = await api.post<ApiResponse<AuthResponse>>('/auth/register', data)
  return res.data.data
}

export const getCurrentUser = async () => {
  const res = await api.get('/users/me')
  return res.data.data
}