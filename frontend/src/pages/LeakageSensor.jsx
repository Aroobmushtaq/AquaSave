// import { useEffect, useMemo, useRef, useState } from "react";
// import Panel from "../components/Panel"; // make sure you import your Panel component

// // Custom hook to simulate leakage sensor
// function useFakeSensor() {
//   const [status, setStatus] = useState({ ok: true, ts: Date.now() });
//   const timer = useRef(null);

//   useEffect(() => {
//     timer.current = setInterval(() => {
//       setStatus({
//         ok: Math.random() > 0.2, // 80% chance "ok", 20% leakage
//         ts: Date.now(),
//       });
//     }, 5000);

//     return () => clearInterval(timer.current);
//   }, []);

//   return status;
// }

// export default function LeakageSensor() {
//   const status = useFakeSensor();
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     setLogs((prev) => [
//       { ts: status.ts, state: status.ok ? "No Leakage" : "Leakage Detected" },
//       ...prev,
//     ].slice(0, 20));
//   }, [status.ts]);

//   const cardStyle = useMemo(
//     () => (status.ok ? "from-emerald-500 to-teal-500" : "from-rose-500 to-orange-500"),
//     [status.ok]
//   );

//   return (
//     <div className="container-narrow">
//       <h2 className="mt-6 text-2xl font-bold">Leakage Sensor</h2>
//       <div className="mt-4 grid gap-6 md:grid-cols-2">
//         <Panel>
//           <div
//             className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${cardStyle}`}
//           >
//             <div className="text-3xl">
//               {status.ok ? "✅ No Leakage" : "⚠️ Leakage Detected"}
//             </div>
//             <p className="mt-2 text-sm opacity-90">
//               Updated: {new Date(status.ts).toLocaleString()}
//             </p>
//           </div>
//           <p className="mt-3 text-slate-600">
//             This demo simulates sensor updates. Connect to your real-time API later.
//           </p>
//         </Panel>
//         <Panel>
//           <h3 className="mb-2 font-semibold">Logs</h3>
//           <div className="max-h-72 overflow-auto">
//             <ul className="space-y-2">
//               {logs.map((l, i) => (
//                 <li
//                   key={i}
//                   className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
//                 >
//                   <span
//                     className={`text-sm ${
//                       l.state.includes("Leakage") ? "text-rose-600" : "text-emerald-700"
//                     }`}
//                   >
//                     {l.state}
//                   </span>
//                   <span className="text-xs text-slate-500">
//                     {new Date(l.ts).toLocaleString()}
//                   </span>
//                 </li>
//               ))}
//               {logs.length === 0 && (
//                 <li className="text-sm text-slate-500">No logs yet.</li>
//               )}
//             </ul>
//           </div>
//         </Panel>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useRef, useState } from "react";
import Panel from "../components/Panel";
import { api, unwrap } from "../services/api";

export default function LeakageSensor() {
  const [status, setStatus] = useState({ ok: true, ts: Date.now() });
  const [logs, setLogs] = useState([]);

  // Fetch real-time sensor from backend every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const [data, err] = await unwrap(api.get("/ai/leak-status"));
      if (data) setStatus(data);
      if (err) console.error("Error fetching leak status:", err);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLogs((prev) => [
      { ts: status.ts, state: status.ok ? "No Leakage" : "Leakage Detected" },
      ...prev,
    ].slice(0, 20));
  }, [status.ts]);

  const cardStyle = useMemo(
    () => (status.ok ? "from-emerald-500 to-teal-500" : "from-rose-500 to-orange-500"),
    [status.ok]
  );

  return (
    <div className="container-narrow">
      <h2 className="mt-6 text-2xl font-bold">Leakage Sensor</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <Panel>
          <div className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${cardStyle}`}>
            <div className="text-3xl">
              {status.ok ? "✅ No Leakage" : "⚠️ Leakage Detected"}
            </div>
            <p className="mt-2 text-sm opacity-90">
              Updated: {new Date(status.ts).toLocaleString()}
            </p>
          </div>
          <p className="mt-3 text-slate-600">
            Real-time sensor updates from the backend.
          </p>
        </Panel>
        <Panel>
          <h3 className="mb-2 font-semibold">Logs</h3>
          <div className="max-h-72 overflow-auto">
            <ul className="space-y-2">
              {logs.length > 0 ? (
                logs.map((l, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
                  >
                    <span className={`text-sm ${l.state.includes("Leakage") ? "text-rose-600" : "text-emerald-700"}`}>
                      {l.state}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(l.ts).toLocaleString()}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-slate-500">No logs yet.</li>
              )}
            </ul>
          </div>
        </Panel>
      </div>
    </div>
  );
}
