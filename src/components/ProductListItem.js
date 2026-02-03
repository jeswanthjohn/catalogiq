function ProductListItem({ product }) {
  if (!product) return null;

  return (
    <li>
      <strong>{product.name || "Unnamed Product"}</strong> —{" "}
      {product.price != null ? `₹${product.price}` : "Price N/A"}
    </li>
  );
}

export default ProductListItem;
