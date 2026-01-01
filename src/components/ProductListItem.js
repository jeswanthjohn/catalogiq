function ProductListItem({ product }) {
  return (
    <li>
      {product.name} – ₹{product.price}
    </li>
  );
}

export default ProductListItem;
