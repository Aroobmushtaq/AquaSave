// import { useEffect, useState } from "react";
// import {api} from "../services/api"; // your axios instance

// export default function Usage() {
//   const [date, setDate] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("drinking");
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch usage history
//   useEffect(() => {
//     async function fetchUsage() {
//       try {
//         const { data } = await api.get("/usage/mine");
//         setRows(data || []);
//       } catch (err) {
//         console.error("Error fetching usage:", err);
//       }
//     }
//     fetchUsage();
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await api.post("/usage/add", {
//         date,
//         amount: Number(amount),
//         category,
//       });
//       setRows([data, ...rows]); // prepend new entry
//       setDate("");
//       setAmount("");
//       setCategory("drinking");
//     } catch (err) {
//       console.error("Error saving usage:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="container-narrow">
//       <h2 className="mt-6 text-2xl font-bold">Water Usage</h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-4">
//         <div>
//           <label className="block text-sm mb-1">Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="input"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm mb-1">Amount (L)</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="input"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm mb-1">Category</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="input"
//           >
//             <option>drinking</option>
//             <option>washing</option>
//             <option>gardening</option>
//             <option>cooking</option>
//             <option>other</option>
//           </select>
//         </div>
//         <div className="flex items-end">
//           <button className="btn btn-primary w-full" disabled={loading}>
//             {loading ? "Saving…" : "Add"}
//           </button>
//         </div>
//       </form>

//       {/* Table */}
//       <div className="mt-6 card p-5 overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr className="text-left text-slate-500">
//               <th className="p-2">Date</th>
//               <th className="p-2">Category</th>
//               <th className="p-2">Amount (L)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((r, i) => (
//               <tr key={i} className="border-t border-slate-100">
//                 <td className="p-2">
//                   {(r.date || r.createdAt || "").slice(0, 10)}
//                 </td>
//                 <td className="p-2 capitalize">{r.category}</td>
//                 <td className="p-2">{r.amount ?? r.liters}</td>
//               </tr>
//             ))}
//             {rows.length === 0 && (
//               <tr>
//                 <td className="p-2 text-slate-500" colSpan={3}>
//                   No entries yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { api, unwrap } from "../services/api";

export default function Usage() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
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
      date,
      liters_used: Number(amount),
      category,
    };
    const [data, err] = await unwrap(api.post("/usage/add", payload));
    if (data) setRows([data, ...rows]);
    if (err) console.error("Error adding usage:", err);
    setDate("");
    setAmount("");
    setCategory("drinking");
    setLoading(false);
  }

  return (
    <div className="container-narrow">
      <h2 className="mt-6 text-2xl font-bold">Water Usage</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-4">
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Amount (L)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
                <td className="p-2">{(r.date || r.createdAt || "").slice(0, 10)}</td>
                <td className="p-2 capitalize">{r.category}</td>
                <td className="p-2">{r.amount ?? r.liters_used}</td>
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
