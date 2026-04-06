import { Link } from 'react-router-dom'
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { formatCurrency } from '../utils/helpers'

export default function ProductCard({ product, onAddToCart, onWishlist, inWishlist }) {
  const handleWishlist = () => {
    if (inWishlist) {
      toast.info('Already in wishlist')
    } else {
      toast.success('Added to wishlist')
    }
    onWishlist(product)
  }

  return (
    <div className="card">

      <Link to={`/products/${product.id}`} className="card-link">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>
      <div className="card-content">
        <Link to={`/products/${product.id}`} className="card-title">
          {product.title}
        </Link>
        <p className="card-category">{product.category}</p>
        <p className="card-price">{formatCurrency(product.price)}</p>
        <p className="card-rating">
          <FaStar className="star" /> {product.rating?.rate ?? 0} ({product.rating?.count ?? 0})
        </p>
        <div className="card-actions">
          <button type="button" className="btn" onClick={() => onAddToCart(product)}>
            <FaShoppingCart /> Add to cart
          </button>
          <button type="button" className={`btn btn-secondary ${inWishlist ? 'active' : ''}`} onClick={handleWishlist}>
            <FaHeart /> {inWishlist ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>
      </div>
    </div>
  )
}
