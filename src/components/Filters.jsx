export default function Filters({ categories, selectedCategory, onCategoryChange, priceRange, onPriceChange, sortOption, onSortChange }) {
  return (
    <div className="filters">
      <div className="filter-group">
        <h4>Categories</h4>
        <div className="tags">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={selectedCategory === cat ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <h4>Price Range</h4>
          <select value={priceRange} onChange={(e) => onPriceChange(e.target.value)} className="filter-select">
            <option value="all">All prices</option>
            <option value="0-100">$0-100</option>
            <option value="100-500">$100-500</option>
            <option value="500-1000">$500-1K</option>
            <option value="1000+">$1K+</option>
          </select>
        </div>

        <div className="filter-group">
          <h4>Sort By</h4>
          <select value={sortOption} onChange={(e) => onSortChange(e.target.value)} className="filter-select">
            <option value="default">Default</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  )
}
