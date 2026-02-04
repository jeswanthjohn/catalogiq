function ProductListItem({ product }) {
  if (!product) return null;

  return (
    <li>
      <article aria-labelledby={`product-${product.id}`}>
        <h3 id={`product-${product.id}`}>
          {product.name || "Unnamed Product"}
        </h3>

        <p>
          {product.price != null
            ? `Price: ₹${product.price}`
            : "Price not available"}
        </p>
      </article>
    </li>
  );
}

export default ProductListItem;
