import { Link } from 'react-router-dom'
import useWishlist from '../hooks/useWishlist'
import { useCartContext } from '../context/CartContext'
import { formatCurrency } from '../utils/helpers'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCartContext()

  if (!wishlist.length) {
    return (
      <div className="page wishlist-page">
        <h1>Your Wishlist</h1>
        <p>No saved items yet.</p>
        <Link to="/products" className="btn">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="page wishlist-page">
      <h1>Your Wishlist</h1>
      <div className="grid">
        {wishlist.map((item) => (
          <div key={item.id} className="card wishlist-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{formatCurrency(item.price)}</p>
            <div className="wishlist-actions">
              <button className="btn" onClick={() => addToCart(item)}>Add to cart</button>
              <button className="btn secondary" onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
