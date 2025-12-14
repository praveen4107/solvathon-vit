import Card from "../../components/Card";

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Card title="Individuals">
        <a href="/admin/individuals" className="text-cyan-400 hover:underline">
          View individual registrations →
        </a>
      </Card>

      <Card title="Teams">
        <a href="/admin/teams" className="text-cyan-400 hover:underline">
          View team registrations →
        </a>
      </Card>
    </div>
  );
}
