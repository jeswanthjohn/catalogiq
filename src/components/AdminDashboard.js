import { useMemo } from "react";
import { calculateAnalytics } from "../utils/analytics";
import DashboardCard from "./DashboardCard";

/**
 * Utility: Export products as CSV
 * (kept exactly as before)
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
    <div className="dashboard">
      <h2 style={{ marginBottom: "0.5rem" }}>Admin Dashboard</h2>

      {/* REAL-TIME INDICATOR */}
      <p style={{ color: "#777", marginBottom: "1.5rem" }}>
        Live analytics (simulated for demo purposes)
      </p>

      {/* ACTIONS */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => exportProductsCSV(products)}
          disabled={!products || products.length === 0}
        >
          Export Products CSV
        </button>
      </div>

      {/* KPI SECTION */}
      <div className="kpi-grid">
        <DashboardCard title="Total Products">
          <h2>{stats.totalProducts}</h2>
        </DashboardCard>

        <DashboardCard title="Total Revenue">
          <h2>₹{stats.totalRevenue}</h2>
        </DashboardCard>

        <DashboardCard title="Average Rating">
          <h2>{stats.averageRating}</h2>
        </DashboardCard>
      </div>
    </div>
  );
}

export default AdminDashboard;
