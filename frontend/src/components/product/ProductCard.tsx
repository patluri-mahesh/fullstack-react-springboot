import type { Product } from '../../types'
import { Link } from 'react-router-dom'

interface Props {
  product: Product
  onDelete?: (id: number) => void
  isAdmin?: boolean
}

export default function ProductCard({ product, onDelete, isAdmin }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name}
          className="w-full h-48 object-cover" />
      )}
      {!product.imageUrl && (
        <div className="w-full h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
          <span className="text-4xl">📦</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
          <span className="text-primary-600 font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.stock > 0
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
          {product.category && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {product.category}
            </span>
          )}
        </div>
        {isAdmin && onDelete && (
          <div className="mt-3 flex gap-2">
            <Link to={`/admin/products/${product.id}/edit`}
              className="flex-1 text-center text-sm bg-primary-50 text-primary-600 hover:bg-primary-100 py-1 rounded transition-colors">
              Edit
            </Link>
            <button onClick={() => onDelete(product.id)}
              className="flex-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 py-1 rounded transition-colors">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}