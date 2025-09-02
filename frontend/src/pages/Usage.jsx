import { useEffect, useState } from "react";
import { api, unwrap } from "../services/api";

export default function Usage() {
  const [litersUsed, setLitersUsed] = useState("");
  const [category, setCategory] = useState("drinking");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch usage history
  useEffect(() => {
    (async () => {
      const [data, err] = await unwrap(api.get("/usage/mine"));
      if (data) setRows(data);
      if (err) console.error("Error fetching usage:", err);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      liters_used: Number(litersUsed),
      category,
    };

    const [data, err] = await unwrap(api.post("/usage/add", payload));

    if (data) setRows([data, ...rows]); // backend returns usage with id + date
    if (err) console.error("Error adding usage:", err);

    setLitersUsed("");
    setCategory("drinking");
    setLoading(false);
  }

  return (
    <div className="container-narrow">
      <h2 className="mt-6 text-2xl font-bold">Water Usage</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm mb-1">Amount (L)</label>
          <input
            type="number"
            value={litersUsed}
            onChange={(e) => setLitersUsed(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input"
          >
            <option>drinking</option>
            <option>washing</option>
            <option>gardening</option>
            <option>cooking</option>
            <option>other</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Saving…" : "Add"}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="mt-6 card p-5 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="p-2">Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Amount (L)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="p-2">{(r.date || "").slice(0, 10)}</td>
                <td className="p-2 capitalize">{r.category}</td>
                <td className="p-2">{r.liters_used}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="p-2 text-slate-500" colSpan={3}>
                  No entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
