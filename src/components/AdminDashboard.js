import { useMemo } from "react";
import DashboardCard from "./DashboardCard";

/**
 * Utility: Export products as CSV
 * Defensive against malformed product data.
 */
function exportProductsCSV(products) {
  if (!Array.isArray(products) || products.length === 0) return;

  const headers = ["id", "name", "price", "category", "unitsSold"];

  const rows = products.map((p) =>
    [
      p?.id ?? "",
      typeof p?.name === "string" ? p.name : "",
      typeof p?.price === "number" ? p.price : "",
      typeof p?.category === "string" ? p.category : "",
      typeof p?.unitsSold === "number" ? p.unitsSold : 0,
    ].join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "products-report.csv";
  link.click();

  URL.revokeObjectURL(url);
}

/**
   Indian currency formatter
 */
const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function AdminDashboard({ products = [] }) {
  const hasData = Array.isArray(products) && products.length > 0;

  const stats = useMemo(() => {
    if (!hasData) {
      return {
        totalProducts: 0,
        totalRevenue: 0,
        averageRating: 0,
      };
    }

    const totalProducts = products.length;

    const totalRevenue = products.reduce((sum, p) => {
      const price = typeof p?.price === "number" ? p.price : 0;
      const unitsSold =
        typeof p?.unitsSold === "number" ? p.unitsSold : 0;

      return sum + price * unitsSold;
    }, 0);

    const averageRating =
      products.reduce((sum, p) => {
        return sum + (typeof p?.rating === "number" ? p.rating : 0);
      }, 0) / totalProducts;

    return {
      totalProducts,
      totalRevenue,
      averageRating: Number(averageRating.toFixed(2)),
    };
  }, [products, hasData]);

  if (!hasData) {
    return (
      <section>
        <p style={{ color: "#666", marginTop: "1rem" }}>
          No product data available. Analytics will appear once products are
          added.
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
          <p>{stats.averageRating}</p>
        </DashboardCard>
      </section>
    </section>
  );
}

export default AdminDashboard;
