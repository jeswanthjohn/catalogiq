import ProductListItem from "./ProductListItem";

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <section aria-live="polite">
        <p style={{ padding: "1rem", color: "#555" }}>
          No products found. Try adjusting your filters.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="products-heading">
      <h3 id="products-heading" className="sr-only">
        Products
      </h3>

      <ul className="product-grid" aria-live="polite">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}
