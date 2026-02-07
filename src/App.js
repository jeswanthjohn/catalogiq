import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ProductGrid from "./components/ProductGrid";
import AdminDashboard from "./components/AdminDashboard";
import useProducts from "./hooks/useProducts";

function App() {
  /* =========================
     STATE
     ========================= */

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Filter & sort state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  /* =========================
     LOAD PRODUCTS (ONCE)
     ========================= */

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/products.json`)
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
     DERIVED PRODUCTS (HOOK)
     ========================= */

  const derivedProducts = useProducts(products, {
    category: selectedCategory,
    sortOrder,
  });

  /* =========================
     RESET PAGINATION ON FILTER CHANGE
     ========================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOrder]);

  /* =========================
     PAGINATION
     ========================= */

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return derivedProducts.slice(start, start + itemsPerPage);
  }, [derivedProducts, currentPage, itemsPerPage]);

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

          <ProductGrid
            products={paginatedProducts}
            allProducts={products}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
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
