import { useEffect, useState } from "react";
import { api, unwrap } from "../services/api";

export default function Leaderboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const [data, err] = await unwrap(api.get("/leaderboard"));
      if (data) {
        // Sort by saved_liters descending, compute rank + badges
        const processed = data
          .sort((a, b) => (b.saved_liters || 0) - (a.saved_liters || 0))
          .map((user, idx) => ({
            rank: idx + 1,
            name: user.name || "Anonymous",
            saved: user.saved_liters || 0,
            badges: getBadges(user.saved_liters || 0),
          }));
        setRows(processed);
      }
      if (err) console.error("Error fetching leaderboard:", err);
    })();
  }, []);

  function getBadges(saved) {
    const badges = [];
    if (saved > 0) badges.push({ icon: "💧", text: "Great start! Keep saving water." });
    if (saved >= 50) badges.push({ icon: "🌊", text: "Water Hero! You're making a difference." });
    if (saved >= 80) badges.push({ icon: "🥇", text: "Water Master! Incredible effort!" });
    return badges;
  }

  return (
    <div className="container-narrow">
      <h2 className="mt-6 text-2xl font-bold">Leaderboard</h2>
      <div className="mt-4 card overflow-x-auto p-5">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="p-2">Rank</th>
              <th className="p-2">Name</th>
              <th className="p-2">Saved (L)</th>
              <th className="p-2">Badges</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((r) => (
                <tr
                  key={r.rank}
                  className="border-t border-slate-100 hover:bg-teal-50/40"
                >
                  <td className="p-2 font-semibold">{r.rank}</td>
                  <td className="p-2">{r.name}</td>
                  <td className="p-2">{r.saved}</td>
                  <td className="p-2 space-y-1">
                    {r.badges.map((b, i) => (
                      <div key={i} className="flex items-center space-x-1">
                        <span>{b.icon}</span>
                        <span className="text-xs text-slate-500">{b.text}</span>
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 text-slate-500" colSpan={4}>
                  Loading leaderboard...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
