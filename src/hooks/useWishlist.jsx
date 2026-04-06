import { useCartContext } from '../context/CartContext'

export default function useWishlist() {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useCartContext()
  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist }
}
