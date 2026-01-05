export default function DashboardCard({ title, children }) {
  return (
    <div className="dashboard-card">
      {title && <h3 className="dashboard-card-title">{title}</h3>}
      {children}
    </div>
  );
}
