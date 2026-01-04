import ProductListItem from "./ProductListItem";

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <p style={{ padding: "1rem" }}>No products available.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
