import { useState } from 'react'
import { useProducts, useSearchProducts } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function ProductsPage() {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const { data: allProducts, isLoading: loadingAll } = useProducts(page, 9)
  const { data: searchResults, isLoading: loadingSearch } = useSearchProducts(search, 0)

  const displayData = search.length > 1 ? searchResults : allProducts
  const isLoading = search.length > 1 ? loadingSearch : loadingAll

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(0)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">
            {displayData?.totalElements ?? 0} products available
          </p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
          />
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
          {search && (
            <button type="button" onClick={() => { setSearch(''); setSearchInput('') }}
              className="text-gray-500 hover:text-gray-700 px-2">✕</button>
          )}
        </form>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData?.content.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {displayData?.content.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg">No products found</p>
            </div>
          )}

          {!search && displayData && displayData.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50">
                Previous
              </button>
              <span className="px-4 py-2 text-gray-600">
                Page {page + 1} of {displayData.totalPages}
              </span>
              <button disabled={displayData.last} onClick={() => setPage(p => p + 1)}
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