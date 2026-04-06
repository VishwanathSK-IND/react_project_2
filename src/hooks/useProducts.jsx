import { useEffect, useMemo, useState } from 'react'
import api from '../services/api'

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      setError(null)
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/products/categories'),
        ])
        setProducts(productsRes.data)
        setCategories(['all', ...categoriesRes.data])
      } catch {
        setError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const categoriesWithCounts = useMemo(() => {
    const map = { all: products.length }
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1
    })
    return map
  }, [products])

  return { products, categories, categoriesWithCounts, loading, error }
}
