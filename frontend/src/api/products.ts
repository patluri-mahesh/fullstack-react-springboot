import api from './axios'
import type { ApiResponse, PageResponse, Product, ProductForm } from '../types'

export const getProducts = async (page = 0, size = 10, sortBy = 'createdAt') => {
  const res = await api.get<ApiResponse<PageResponse<Product>>>(
    `/products?page=${page}&size=${size}&sortBy=${sortBy}`
  )
  return res.data.data
}

export const searchProducts = async (keyword: string, page = 0, size = 10) => {
  const res = await api.get<ApiResponse<PageResponse<Product>>>(
    `/products/search?keyword=${keyword}&page=${page}&size=${size}`
  )
  return res.data.data
}

export const getProductById = async (id: number) => {
  const res = await api.get<ApiResponse<Product>>(`/products/${id}`)
  return res.data.data
}

export const createProduct = async (data: ProductForm): Promise<Product> => {
  const res = await api.post<ApiResponse<Product>>('/products', data)
  return res.data.data
}

export const updateProduct = async (id: number, data: ProductForm): Promise<Product> => {
  const res = await api.put<ApiResponse<Product>>(`/products/${id}`, data)
  return res.data.data
}

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`)
}