import { useMemo } from "react";
import DashboardCard from "./DashboardCard";
import { calculateAnalytics } from "../utils/analytics";
import { exportProductsCSV } from "../utils/exportUtils";

/**
 * Indian currency formatter (safe)
 */
const formatCurrency = (value) => {
  const safeValue = Number.isFinite(value) ? value : 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(safeValue);
};

function AdminDashboard({ products = [] }) {
  const hasData = Array.isArray(products) && products.length > 0;

  const stats = useMemo(() => {
    return calculateAnalytics(products);
  }, [products]);

  if (!hasData) {
    return (
      <section className="admin-empty-state">
        <h4>No Analytics Data Available</h4>
        <p>
          Analytics will appear once product data is added to the catalog.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="dashboard-heading" className="dashboard">
      <h3 id="dashboard-heading">Live Analytics</h3>

      <p style={{ color: "#777", marginBottom: "1.5rem" }}>
        Live analytics (simulated for demo purposes)
      </p>

      {/* ACTIONS */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          className="export-btn"
          onClick={() => exportProductsCSV(products)}
          aria-label="Export products as CSV"
        >
          Export Products CSV
        </button>
      </div>

      {/* KPI SECTION */}
      <section className="kpi-grid" aria-label="Key performance indicators">
        <DashboardCard title="Total Products">
          <p>{stats.totalProducts}</p>
        </DashboardCard>

        <DashboardCard title="Total Revenue">
          <p>{formatCurrency(stats.totalRevenue)}</p>
        </DashboardCard>

        <DashboardCard title="Average Rating">
          <p>
            {Number.isFinite(stats.averageRating)
              ? stats.averageRating
              : 0}
          </p>
        </DashboardCard>
      </section>
    </section>
  );
}

export default AdminDashboard;