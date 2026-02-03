import { useEffect, useMemo, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import FilterBar from "./components/Filters";
import Pagination from "./components/Pagination";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  /* =========================
     STATE
     ========================= */

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceMin: 0,
    priceMax: 100000,
    rating: 0,
    search: "",
  });
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  /* =========================
     LOAD PRODUCTS (ONCE)
     ========================= */

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        // initialize sold count for analytics realism
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
        prev.map((p) => {
          // small chance a product "sells"
          if (Math.random() > 0.9) {
            return {
              ...p,
              sold: p.sold + 1,
            };
          }
          return p;
        })
      );
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  /* =========================
     RESET PAGE ON FILTER/SORT
     ========================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  /* =========================
     DERIVED STATE
     ========================= */

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        !filters.category || p.category === filters.category;
      const matchPrice =
        p.price >= filters.priceMin && p.price <= filters.priceMax;
      const matchRating = p.rating >= filters.rating;
      const matchSearch = p.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      return (
        matchCategory &&
        matchPrice &&
        matchRating &&
        matchSearch
      );
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];

    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [filteredProducts, sort]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  /* =========================
     RENDER
     ========================= */

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Product Catalog</h1>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />

      <ProductGrid products={paginatedProducts} />

      <Pagination
        currentPage={currentPage}
        totalItems={sortedProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <hr style={{ margin: "3rem 0" }} />

      <AdminDashboard products={products} />
    </div>
  );
}

export default App;
