// import { useEffect, useState } from "react";
// import { Panel, Progress } from "../components/Card";
// import { api, unwrap } from "../services/api";


// const dummy = [
// { id: "c1", title: "7-day Shower Saver", description: "Shorten showers to save 50L/day", goal: 350, progress: 210 },
// { id: "c2", title: "No-Leak Week", description: "Inspect faucets & pipes", goal: 1, progress: 0 },
// ];


// export default function Challenges() {
// const [list, setList] = useState(dummy);


// useEffect(() => {
// // Optionally fetch from API later
// // (async () => { const [data] = await unwrap(api.get('/challenges')); if (data) setList(data); })();
// }, []);


// const join = async (id) => {
// // await unwrap(api.post(`/challenges/join/${id}`));
// setList((prev) => prev.map((c) => c.id===id ? { ...c, joined: true } : c));
// };


// return (
// <div className="container-narrow">
// <h2 className="mt-6 text-2xl font-bold">Challenges</h2>
// <div className="mt-4 grid gap-5 md:grid-cols-2">
// {list.map((c) => (
// <Panel key={c.id}>
// <div className="flex items-start justify-between gap-4">
// <div>
// <h3 className="text-lg font-semibold">{c.title}</h3>
// <p className="text-slate-600">{c.description}</p>
// </div>
// <span className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">Goal: {c.goal}</span>
// </div>
// <div className="mt-3">
// <Progress value={Math.round((c.progress / c.goal) * 100)} />
// <div className="mt-1 text-right text-xs text-slate-500">{c.progress}/{c.goal}</div>
// </div>
// <div className="mt-4">
// <button onClick={()=>join(c.id)} className="btn btn-primary" disabled={c.joined}>{c.joined?"Joined":"Join Challenge"}</button>
// </div>
// </Panel>
// ))}
// </div>
// </div>
// );
// }
import { useEffect, useState } from "react";
import { Panel, Progress } from "../components/Card";
import { api, unwrap } from "../services/api";

export default function Challenges() {
  const [list, setList] = useState([]);

  // Fetch all challenges from backend
  useEffect(() => {
    (async () => {
      const [data, err] = await unwrap(api.get("/challenges"));
      if (data) setList(data.map(c => ({ ...c, joined: c.joined || false })));
      if (err) console.error("Error fetching challenges:", err);
    })();
  }, []);

  // Join a challenge
  const join = async (id) => {
    const [data, err] = await unwrap(api.post(`/challenges/join/${id}`));
    if (err) {
      console.error("Error joining challenge:", err);
      return;
    }
    // Update local list to mark as joined
    setList((prev) => prev.map((c) => c.id === id ? { ...c, joined: true } : c));
  };

  return (
    <div className="container-narrow">
      <h2 className="mt-6 text-2xl font-bold">Challenges</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {list.length > 0 ? list.map((c) => (
          <Panel key={c.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-slate-600">{c.description}</p>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">
                Goal: {c.goal}
              </span>
            </div>
            <div className="mt-3">
              <Progress value={Math.round((c.progress / c.goal) * 100)} />
              <div className="mt-1 text-right text-xs text-slate-500">
                {c.progress}/{c.goal}
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => join(c.id)}
                className="btn btn-primary"
                disabled={c.joined}
              >
                {c.joined ? "Joined" : "Join Challenge"}
              </button>
            </div>
          </Panel>
        )) : (
          <p className="text-slate-500 col-span-2">Loading challenges...</p>
        )}
      </div>
    </div>
  );
}
