import { useMemo, useState } from 'react'
import useProducts from '../hooks/useProducts'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'
import useDebounce from '../hooks/useDebounce'
import ProductGrid from '../components/ProductGrid'
import Filters from '../components/Filters'
import SearchBar from '../components/SearchBar'

const categoryName = (name) => name[0].toUpperCase() + name.slice(1)

const ITEMS_PER_PAGE = 20

export default function Products() {
  const { products, categories, loading, error } = useProducts()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortOption, setSortOption] = useState('default')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const searchDebounced = useDebounce(search, 300)

  const filtered = useMemo(() => {
    let result = [...products]

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }
    if (priceRange !== 'all') {
      result = result.filter((p) => {
        const price = p.price
        if (priceRange === '0-100') return price >= 0 && price <= 100
        if (priceRange === '100-500') return price > 100 && price <= 500
        if (priceRange === '500-1000') return price > 500 && price <= 1000
        if (priceRange === '1000+') return price > 1000
        return true
      })
    }
    if (searchDebounced.trim()) {
      const term = searchDebounced.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(term))
    }

    if (sortOption === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sortOption === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sortOption === 'rating') result.sort((a, b) => b.rating?.rate - a.rating?.rate)
    else if (sortOption === 'newest') result.sort((a, b) => b.id - a.id)

    return result
  }, [products, selectedCategory, priceRange, sortOption, searchDebounced])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filtered.slice(start, start + ITEMS_PER_PAGE)
  }, [filtered, currentPage])

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  if (loading) return <p className="loading">Loading products...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="page products-page">
      <h1>All Products</h1>

      <div className="page-controls">
        <SearchBar value={search} onChange={(e) => { setSearch(e.target.value); handleFilterChange() }} />
        <Filters
          categories={categories.map(categoryName)}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => { setSelectedCategory(cat.toLowerCase()); handleFilterChange() }}
          priceRange={priceRange}
          onPriceChange={(pr) => { setPriceRange(pr); handleFilterChange() }}
          sortOption={sortOption}
          onSortChange={(opt) => { setSortOption(opt); handleFilterChange() }}
        />
      </div>

      <ProductGrid
        items={paginatedProducts}
        onAddToCart={addToCart}
        onWishlist={addToWishlist}
        inWishlist={isInWishlist}
      />

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? '' : 'active'}
          >
            ← First
          </button>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = currentPage > 3 ? currentPage - 2 + i : i + 1
            if (page > totalPages) return null
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            )
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && <span>...</span>}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? '' : 'active'}
          >
            Last →
          </button>
        </div>
      )}
    </div>
  )
}
