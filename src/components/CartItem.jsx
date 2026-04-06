import { FaTrash } from 'react-icons/fa'
import { formatCurrency } from '../utils/helpers'

export default function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p>{formatCurrency(item.price)}</p>
        <div className="counter">
          <button type="button" onClick={() => onUpdate(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onUpdate(item.id, item.quantity + 1)}>+</button>
        </div>
      </div>
      <button type="button" className="btn-remove" onClick={() => onRemove(item.id)}>
        <FaTrash />
      </button>
    </div>
  )
}
