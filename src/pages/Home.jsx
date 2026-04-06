import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import { formatCurrency } from '../utils/helpers'

export default function Home() {
  const { products, loading, error } = useProducts()

  const featured = products.slice(0, 8)

  if (loading) return <p className="loading">Loading featured products...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="page home">
      <header className="hero-section">
        <h1>Welcome to Product Explorer</h1>
        <p>Discover thousands of products at amazing prices</p>
        <Link to="/products" className="btn primary">
          Start Shopping
        </Link>
      </header>

      <section>
        <h2>Featured Products</h2>
        <div className="grid">
          {featured.map((item) => (
            <article key={item.id} className="card">
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <Link to={`/products/${item.id}`} className="card-title">
                  {item.title}
                </Link>
                <p className="card-category">{item.category}</p>
                <p className="card-price">{formatCurrency(item.price)}</p>
                <div className="card-actions">
                  <Link to={`/products/${item.id}`} className="btn primary">
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2>Ready to Explore?</h2>
        <p style={{ fontSize: '1.05rem', color: '#6b7280' }}>
          Browse our complete collection of products across multiple categories
        </p>
        <Link to="/products" className="btn primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>
          Shop All Products
        </Link>
      </section>
    </div>
  )
}
