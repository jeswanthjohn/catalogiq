import { useMemo } from "react";
import {
  getTotalProducts,
  getAveragePrice,
  getProductsByCategory,
  getTopExpensiveProducts,
} from "../utils/analytics";

/**
 * Utility: Export products as CSV
 */
function exportProductsCSV(products) {
  const headers = ["id", "name", "price", "category"];
  const rows = products.map((p) =>
    [p.id, p.name, p.price, p.category].join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "products-report.csv";
  link.click();
}

function AdminDashboard({ products }) {
  /**
   * Memoized analytics calculations
   * (prevents recomputation on every render)
   */
  const stats = useMemo(() => {
    return {
      total: getTotalProducts(products),
      averagePrice: getAveragePrice(products),
      byCategory: getProductsByCategory(products),
      topProducts: getTopExpensiveProducts(products),
    };
  }, [products]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Dashboard</h2>

      {/* EXACT PLACE: CSV EXPORT BUTTON */}
      <button
        onClick={() => exportProductsCSV(products)}
        style={{ marginBottom: "1rem" }}
      >
        Export Products CSV
      </button>

      <p>
        <strong>Total Products:</strong> {stats.total}
      </p>

      <p>
        <strong>Average Price:</strong> ₹{stats.averagePrice}
      </p>

      <h3>Products by Category</h3>
      <ul>
        {Object.entries(stats.byCategory).map(([category, count]) => (
          <li key={category}>
            {category}: {count}
          </li>
        ))}
      </ul>

      <h3>Top Expensive Products</h3>
      <ul>
        {stats.topProducts.map((product) => (
          <li key={product.id}>
            {product.name} – ₹{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
