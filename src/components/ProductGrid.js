import ProductListItem from "./ProductListItem";

export default function ProductGrid({ products }) {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <section aria-live="polite" style={{ marginTop: "1rem" }}>
        <p style={{ padding: "1rem", color: "#555", textAlign: "center" }}>
          No products found. Try adjusting your filters.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="products-heading" style={{ marginTop: "1.5rem" }}>
      <h2
        id="products-heading"
        style={{ marginBottom: "1rem", fontSize: "1.25rem" }}
      >
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
