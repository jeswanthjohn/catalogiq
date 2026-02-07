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

  // NEW: filter & sort state
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
     DERIVED STATE (FILTER + SORT)
     ========================= */

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort by price
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, sortOrder]);

  /* =========================
     PAGINATION
     ========================= */

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

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
