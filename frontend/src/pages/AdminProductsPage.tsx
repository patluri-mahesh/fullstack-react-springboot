import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts, useDeleteProduct } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function AdminProductsPage() {
  const [page, setPage] = useState(0)
  const { data, isLoading } = useProducts(page, 9)
  const deleteProduct = useDeleteProduct()

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-500 mt-1">{data?.totalElements ?? 0} total products</p>
        </div>
        <Link to="/admin/products/new"
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          + Add Product
        </Link>
      </div>

      {isLoading ? <LoadingSpinner /> : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.content.map(product => (
              <ProductCard key={product.id} product={product} isAdmin onDelete={handleDelete} />
            ))}
          </div>

          {data && data.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50">
                Previous
              </button>
              <span className="px-4 py-2 text-gray-600">Page {page + 1} of {data.totalPages}</span>
              <button disabled={data.last} onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}