import { FaSearch } from 'react-icons/fa'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <FaSearch />
      <input type="text" placeholder="Search products..." value={value} onChange={onChange} />
    </div>
  )
}
