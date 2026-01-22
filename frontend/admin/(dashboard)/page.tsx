import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 text-white">
      <section className="rounded-md border border-gray-700 bg-neutral-900 p-4">
        <h2 className="text-lg font-medium mb-2">View Registrations</h2>
        <p className="text-gray-300 mb-4">Teams only. Individuals have been removed.</p>
        <Link
          href="/admin/teams"
          className="inline-flex items-center rounded-md bg-white/10 hover:bg-white/20 px-4 py-2 text-sm"
        >
          Go to Teams
        </Link>
      </section>
    </main>
  );
}
