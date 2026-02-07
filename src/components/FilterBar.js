export default function FilterBar({
  products,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}) {
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  );

  return (
    <div className="filter-bar" role="region" aria-label="Product filters">
      <label>
        Category:
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter products by category"
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Sort by price:
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort products by price"
        >
          <option value="">None</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
        </select>
      </label>
    </div>
  );
}
