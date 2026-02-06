export default function ProductListItem({ product }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 0.5rem 0" }}>{product.name}</h3>
      <p style={{ margin: "0.25rem 0", fontWeight: "600" }}>
        ₹{product.price}
      </p>
      {product.rating && (
        <p style={{ margin: "0.25rem 0", color: "#555" }}>
          ⭐ {product.rating}
        </p>
      )}
    </div>
  );
}
