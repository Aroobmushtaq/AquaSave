export default function StatCard({ title, value, icon, accent = "from-sky-500 to-indigo-500" }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${accent} p-6 text-white shadow`}>
      <div className="text-2xl">{icon}</div>
      <p className="mt-2 text-sm opacity-80">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
