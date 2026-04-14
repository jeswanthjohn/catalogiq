import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ProductGrid from "./components/ProductGrid";
import AdminDashboard from "./components/AdminDashboard";
import ErrorBoundary from "./components/ErrorBoundary";
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
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
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
     TOTAL PAGES 
     ========================= */

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(derivedProducts.length / itemsPerPage));
  }, [derivedProducts.length, itemsPerPage]);

  /* =========================
     CLAMP CURRENT PAGE 
     ========================= */

  useEffect(() => {
    setCurrentPage((prev) => {
      if (prev > totalPages) return totalPages;
      if (prev < 1) return 1;
      return prev;
    });
  }, [totalPages]);

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
    const safePage = Math.min(Math.max(currentPage, 1), totalPages);
    const start = (safePage - 1) * itemsPerPage;
    return derivedProducts.slice(start, start + itemsPerPage);
  }, [derivedProducts, currentPage, itemsPerPage, totalPages]);

  /* =========================
     RENDER
     ========================= */

  return (
    <>
      <header>
        <h1>Product Catalog</h1>
        <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
          Page {currentPage} of {totalPages}
        </p>
      </header>

      <main>
        {/* ================= CATALOG SECTION ================= */}
        <section aria-labelledby="catalog-section">
          <h2 id="catalog-section" className="sr-only">
            Product listing
          </h2>

          <ErrorBoundary>
            <ProductGrid
              products={paginatedProducts}
              allProducts={products}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />
          </ErrorBoundary>
        </section>

        <hr />

        {/* ================= ADMIN SECTION ================= */}
        <section aria-labelledby="admin-section" id="admin-section">
          <h2 id="admin-section-title">Admin Dashboard</h2>

          <ErrorBoundary>
            <AdminDashboard products={products} />
          </ErrorBoundary>
        </section>
      </main>
    </>
  );
}

export default App;