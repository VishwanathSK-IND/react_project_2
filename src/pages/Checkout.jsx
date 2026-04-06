import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import useCart from '../hooks/useCart'
import { formatCurrency } from '../utils/helpers'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  postal: yup.string().required('Postal code is required'),
}).required()

export default function Checkout() {
  const { cartItems, subtotal, tax, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    if (!cartItems.length && !orderPlaced) {
      navigate('/cart')
    }
  }, [cartItems, navigate, orderPlaced])

  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [orderPlaced, navigate])

  const onSubmit = (data) => {
    console.log('Checkout data:', data)
    clearCart()
    setOrderPlaced(true)
  }

  if (!cartItems.length && !orderPlaced) return null

  if (orderPlaced) {
    return (
      <div className="page checkout-page">
        <div className="order-confirmation">
          <FaCheckCircle className="confirmation-icon" />
          <h1>Your Order is Placed!</h1>
          <p className="confirmation-message">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="confirmation-details">
            <p>
              <strong>Order Total:</strong> {formatCurrency(total)}
            </p>
            <p className="redirect-message">
              Redirecting to home in 3 seconds...
            </p>
          </div>
          <Link to="/" className="btn primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <section className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.title} x{item.quantity}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <p>Subtotal: {formatCurrency(subtotal)}</p>
          <p>Tax: {formatCurrency(tax)}</p>
          <p className="total">Total: {formatCurrency(total)}</p>
          <Link to="/cart" className="btn secondary">Back to cart</Link>
        </section>

        <section className="checkout-form">
          <h2>Shipping Details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Name
              <input {...register('name')} />
              <p className="error">{errors.name?.message}</p>
            </label>
            <label>
              Email
              <input {...register('email')} />
              <p className="error">{errors.email?.message}</p>
            </label>
            <label>
              Address
              <input {...register('address')} />
              <p className="error">{errors.address?.message}</p>
            </label>
            <label>
              City
              <input {...register('city')} />
              <p className="error">{errors.city?.message}</p>
            </label>
            <label>
              Postal Code
              <input {...register('postal')} />
              <p className="error">{errors.postal?.message}</p>
            </label>
            <button type="submit" className="btn primary">Place order</button>
          </form>
        </section>
      </div>
    </div>
  )
}
