import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'
import api from '../services/api'
import { formatCurrency } from '../utils/helpers'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/products/${id}`)
        setProduct(response.data)
      } catch {
        setError('Could not load product details.')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      toast.info('Already in wishlist')
    } else {
      toast.success('Added to wishlist')
    }
    addToWishlist(product)
  }

  if (loading) return <p className="loading">Loading details...</p>
  if (error) return <p className="error">{error}</p>
  if (!product) return null

  return (
    <div className="page product-details">
      <Link to="/products" className="btn secondary">← Back to products</Link>
      <div className="details-layout">
        <div className="gallery">
          <Swiper spaceBetween={10} slidesPerView={1}>
            {[product.image].map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={product.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="details-info">
          <h1>{product.title}</h1>
          <p className="category">Category: {product.category}</p>
          <p className="rating">
            <FaStar className="star" /> {product.rating?.rate ?? 0} ({product.rating?.count ?? 0} reviews)
          </p>
          <p className="money">{formatCurrency(product.price)}</p>
          <p>{product.description}</p>
          <div className="actions">
            <button className="btn primary" onClick={() => addToCart(product)}>
              <FaShoppingCart /> Add to cart
            </button>
            <button className={`btn ${isInWishlist(product.id) ? 'active' : 'secondary'}`} onClick={handleWishlist}>
              <FaHeart /> {isInWishlist(product.id) ? 'Wishlisted' : 'Add to wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
