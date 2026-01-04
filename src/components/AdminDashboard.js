import { useMemo } from "react";
import { calculateAnalytics } from "../utils/analytics";

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
   * (single aggregation pass)
   */
  const stats = useMemo(() => {
    return calculateAnalytics(products);
  }, [products]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Dashboard</h2>

      <button
        onClick={() => exportProductsCSV(products)}
        style={{ marginBottom: "1rem" }}
        disabled={!products || products.length === 0}
      >
        Export Products CSV
      </button>

      <p>
        <strong>Total Products:</strong> {stats.totalProducts}
      </p>

      <p>
        <strong>Total Revenue:</strong> ₹{stats.totalRevenue}
      </p>

      <p>
        <strong>Average Rating:</strong> {stats.averageRating}
      </p>
    </div>
  );
}

export default AdminDashboard;
