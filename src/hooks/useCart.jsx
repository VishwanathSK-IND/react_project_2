import { useCartContext } from '../context/CartContext'

export default function useCart() {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } = useCartContext()
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Number((subtotal * 0.1).toFixed(2))
  const total = Number((subtotal + tax).toFixed(2))
  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, tax, total }
}
