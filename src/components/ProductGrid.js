import ProductListItem from "./ProductListItem";

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <p style={{ padding: "1rem", color: "#555" }}>
        No products found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <ul className="product-grid">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
