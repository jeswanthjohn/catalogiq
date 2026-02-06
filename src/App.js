import { useEffect, useMemo, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  /* =========================
     STATE
     ========================= */

  const [products, setProducts] = useState([]);
  const [filters] = useState({
    category: "",
    priceMin: 0,
    priceMax: 100000,
    rating: 0,
    search: "",
  });
  const [sort] = useState("");
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

  const filteredProducts = useMemo(() => {
    return products;
  }, [products]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  /* =========================
     RENDER
     ========================= */

  return (
    <>
      <header>
        <h1 style={{ textAlign: "center" }}>Product Catalog</h1>
      </header>

      <main>
        <section aria-labelledby="catalog-section">
          <h2 id="catalog-section" className="sr-only">
            Product listing
          </h2>

          <ProductGrid products={paginatedProducts} />
        </section>

        <hr style={{ margin: "3rem 0" }} />

        <section aria-labelledby="admin-section">
          <h2 id="admin-section">Admin Dashboard</h2>
          <AdminDashboard products={products} />
        </section>
      </main>
    </>
  );
}

export default App;
