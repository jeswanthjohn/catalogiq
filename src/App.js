import { useState } from "react";
import { fetchAllProducts } from "./services/productService";
import ProductGrid from "./components/ProductGrid";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const products = fetchAllProducts();

  return (
    <div>
      <header style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
        <button onClick={() => setIsAdminView(false)}>
          Catalog View
        </button>
        <button onClick={() => setIsAdminView(true)}>
          Admin View
        </button>
      </header>

      {isAdminView ? (
        <AdminDashboard products={products} />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}

export default App;
