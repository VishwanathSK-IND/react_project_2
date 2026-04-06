import ProductCard from './ProductCard'

export default function ProductGrid({ items, onAddToCart, onWishlist, inWishlist }) {
  if (!items.length) {
    return <div className="empty">No products match your filters.</div>
  }

  return (
    <div className="grid">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onWishlist={onWishlist}
          inWishlist={inWishlist(product.id)}
        />
      ))}
    </div>
  )
}
