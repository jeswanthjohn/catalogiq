import { useMemo } from "react";
import { calculateAnalytics } from "../utils/analytics";
import DashboardCard from "./DashboardCard";

/**
 * Utility: Export products as CSV
 */
function exportProductsCSV(products) {
  if (!Array.isArray(products) || products.length === 0) return;

  const headers = ["id", "name", "price", "category"];
  const rows = products.map((p) =>
    [
      p.id ?? "",
      p.name ?? "",
      p.price ?? "",
      p.category ?? "",
    ].join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "products-report.csv";
  link.click();
}

function AdminDashboard({ products = [] }) {
  const hasData = Array.isArray(products) && products.length > 0;

  const stats = useMemo(() => {
    return calculateAnalytics(products);
  }, [products]);

  if (!hasData) {
    return (
      <div className="dashboard">
        <h2>Admin Dashboard</h2>
        <p style={{ color: "#666", marginTop: "1rem" }}>
          No product data available. Analytics will appear once products
          are added.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2 style={{ marginBottom: "0.5rem" }}>Admin Dashboard</h2>

      <p style={{ color: "#777", marginBottom: "1.5rem" }}>
        Live analytics (simulated for demo purposes)
      </p>

      {/* ACTIONS */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => exportProductsCSV(products)}
          disabled={!hasData}
        >
          Export Products CSV
        </button>
        {!hasData && (
          <p style={{ fontSize: "0.85rem", color: "#999" }}>
            No data available to export.
          </p>
        )}
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
