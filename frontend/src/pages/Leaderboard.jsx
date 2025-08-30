// import { useEffect, useState } from "react";
// import { api, unwrap } from "../services/api";


// const seed = [
// { rank: 1, name: "Ayesha", saved: 820, badges: ["🏅","💧"] },
// { rank: 2, name: "Hassan", saved: 705, badges: ["🏅"] },
// { rank: 3, name: "Zara", saved: 660, badges: ["💧"] },
// ];


// export default function Leaderboard() {
// const [rows, setRows] = useState(seed);


// useEffect(() => {
// // (async () => { const [data] = await unwrap(api.get('/leaderboard')); if (data) setRows(data); })();
// }, []);


// return (
// <div className="container-narrow">
// <h2 className="mt-6 text-2xl font-bold">Leaderboard</h2>
// <div className="mt-4 card overflow-x-auto p-5">
// <table className="min-w-full text-sm">
// <thead>
// <tr className="text-left text-slate-500">
// <th className="p-2">Rank</th>
// <th className="p-2">Name</th>
// <th className="p-2">Saved (L)</th>
// <th className="p-2">Badges</th>
// </tr>
// </thead>
// <tbody>
// {rows.map((r) => (
// <tr key={r.rank} className="border-t border-slate-100 hover:bg-teal-50/40">
// <td className="p-2 font-semibold">{r.rank}</td>
// <td className="p-2">{r.name}</td>
// <td className="p-2">{r.saved}</td>
// <td className="p-2 space-x-1">{(r.badges||[]).map((b,i)=>(<span key={i}>{b}</span>))}</td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// </div>
// );
// }
import { useEffect, useState } from "react";
import { api, unwrap } from "../services/api";

export default function Leaderboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const [data, err] = await unwrap(api.get("/leaderboard"));
      if (data) setRows(data);
      if (err) console.error("Error fetching leaderboard:", err);
    })();
  }, []);

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
                <tr key={r.rank} className="border-t border-slate-100 hover:bg-teal-50/40">
                  <td className="p-2 font-semibold">{r.rank}</td>
                  <td className="p-2">{r.name}</td>
                  <td className="p-2">{r.saved}</td>
                  <td className="p-2 space-x-1">
                    {(r.badges || []).map((b, i) => <span key={i}>{b}</span>)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 text-slate-500" colSpan={4}>Loading leaderboard...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
