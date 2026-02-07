import ProductListItem from "./ProductListItem";
import FilterBar from "./FilterBar";

export default function ProductGrid({
  products,
  allProducts,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <section aria-labelledby="products-heading" className="catalog-section">
      <h2 id="products-heading" className="section-title">
        Product Listing
      </h2>

      <FilterBar
        products={allProducts}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />

      {(!Array.isArray(products) || products.length === 0) && (
        <div aria-live="polite" className="empty-state">
          <p>No products found. Try adjusting your filters.</p>
        </div>
      )}

      <ul className="product-grid" aria-live="polite">
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <ProductListItem product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
