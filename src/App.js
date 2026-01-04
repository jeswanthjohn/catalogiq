import { useEffect, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import AdminDashboard from "./components/AdminDashboard";
import { getProducts } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Product Catalog</h1>
      <ProductGrid products={products} />
      <AdminDashboard products={products} />
    </div>
  );
}

export default App;
