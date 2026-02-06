import { useEffect, useMemo, useState } from "react";
import "./App.css"; 
import ProductGrid from "./components/ProductGrid";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  /* =========================
     STATE
     ========================= */

  const [products, setProducts] = useState([]);
  const [currentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  /* =========================
     LOAD PRODUCTS (ONCE)
     ========================= */

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((p) => ({
          ...p,
          sold: p.sold || Math.floor(Math.random() * 10),
        }));
        setProducts(enriched);
      });
  }, []);

  /* =========================
     SIMULATED REAL-TIME SALES
     ========================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prev) =>
        prev.map((p) =>
          Math.random() > 0.9 ? { ...p, sold: p.sold + 1 } : p
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     DERIVED STATE
     ========================= */

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPage, itemsPerPage]);

  /* =========================
     RENDER
     ========================= */

  return (
    <>
      <header>
        <h1>Product Catalog</h1>
      </header>

      <main>
        <section aria-labelledby="catalog-section">
          <h2 id="catalog-section" className="sr-only">
            Product listing
          </h2>

          <ProductGrid products={paginatedProducts} />
        </section>

        <hr />

        <section aria-labelledby="admin-section" id="admin-section">
          <h2 id="admin-section-title">Admin Dashboard</h2>
          <AdminDashboard products={products} />
        </section>
      </main>
    </>
  );
}

export default App;
