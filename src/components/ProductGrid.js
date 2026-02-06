import ProductListItem from "./ProductListItem";

export default function ProductGrid({ products }) {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <section aria-live="polite" className="empty-state">
        <p>No products found. Try adjusting your filters.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="products-heading" className="catalog-section">
      <h2 id="products-heading" className="section-title">
        Product Listing
      </h2>

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
