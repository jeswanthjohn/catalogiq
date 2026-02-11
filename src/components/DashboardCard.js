export default function DashboardCard({ title, children }) {
  const isRevenue = title?.toLowerCase().includes("revenue");

  return (
    <article
      className={`dashboard-card ${
        isRevenue ? "dashboard-card--highlight" : ""
      }`}
    >
      {title && <h4 className="dashboard-card-title">{title}</h4>}
      <div className="dashboard-card-value">{children}</div>
    </article>
  );
}
