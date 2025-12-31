import products from "./data/products.json";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>CatalogIQ</h1>
      <p>Initial product catalogue view</p>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} – ₹{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
