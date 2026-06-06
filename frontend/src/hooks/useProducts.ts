import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, searchProducts, createProduct, updateProduct, deleteProduct } from '../api/products'
import type { ProductForm } from '../types'
import toast from 'react-hot-toast'

export const useProducts = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ['products', page, size],
    queryFn: () => getProducts(page, size),
  })
}

export const useSearchProducts = (keyword: string, page = 0) => {
  return useQuery({
    queryKey: ['products', 'search', keyword, page],
    queryFn: () => searchProducts(keyword, page),
    enabled: keyword.length > 1,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ProductForm) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product created successfully!')
    },
    onError: () => toast.error('Failed to create product'),
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductForm }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product updated successfully!')
    },
    onError: () => toast.error('Failed to update product'),
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product deleted!')
    },
    onError: () => toast.error('Failed to delete product'),
  })
}