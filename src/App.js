import products from "./data/products.json";
import ProductListItem from "./components/ProductListItem";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>CatalogIQ</h1>
      <p>Initial product catalogue view</p>

      <ul>
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
