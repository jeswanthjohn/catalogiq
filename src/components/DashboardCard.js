export default function DashboardCard({ title, children }) {
  return (
    <article className="dashboard-card">
      {title && <h4 className="dashboard-card-title">{title}</h4>}
      {children}
    </article>
  );
}
