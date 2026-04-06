import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'
import CartItem from '../components/CartItem'
import { formatCurrency } from '../utils/helpers'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, tax, total } = useCart()

  if (!cartItems.length) {
    return (
      <div className="page cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products" className="btn">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="page cart-page">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeFromCart} onUpdate={updateQuantity} />
        ))}
      </div>
      <div className="summary">
        <h2>Order summary</h2>
        <p>Subtotal: {formatCurrency(subtotal)}</p>
        <p>Tax (10%): {formatCurrency(tax)}</p>
        <p className="total">Total: {formatCurrency(total)}</p>
        <button className="btn secondary" onClick={clearCart}>Clear cart</button>
        <Link to="/checkout" className="btn primary">Proceed to checkout</Link>
      </div>
    </div>
  )
}
