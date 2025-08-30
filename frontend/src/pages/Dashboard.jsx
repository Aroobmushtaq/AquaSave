// import { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import Panel from "../components/Panel";
// import Progress from "../components/Progress";
// import UsageLine from "../components/UsageLine";
// import UsageBars from "../components/UsageBars";
// // import api from "../services/api"; // when backend ready

// const dummyTrend = [
//   { label: "Day 1", liters: 50 },
//   { label: "Day 2", liters: 65 },
//   { label: "Day 3", liters: 40 },
// ];

// export default function Dashboard() {
//   const [summary, setSummary] = useState({
//     totalUsage: 0,
//     totalSavings: 0,
//     badges: 0,
//   });

//   useEffect(() => {
//     (async () => {
//       // Uncomment when backend ready
//       // const [data] = await unwrap(api.get("/usage/total"));
//       // if (data) setSummary({
//       //   totalUsage: data.total,
//       //   totalSavings: data.savings,
//       //   badges: data.badges?.length || 0,
//       // });
//     })();
//   }, []);

//   return (
//     <div className="container-narrow">
//       <h2 className="mt-6 text-2xl font-bold">Dashboard</h2>

//       <div className="mt-6 grid gap-4 md:grid-cols-3">
//         <StatCard title="Total Usage (L)" value={summary.totalUsage} icon="📈" />
//         <StatCard
//           title="Total Savings (L)"
//           value={summary.totalSavings}
//           icon="💰"
//           accent="from-emerald-500 to-teal-500"
//         />
//         <StatCard
//           title="Badges"
//           value={summary.badges}
//           icon="🏅"
//           accent="from-sky-500 to-indigo-500"
//         />
//       </div>

//       <div className="mt-6 grid gap-6 lg:grid-cols-2">
//         <Panel>
//           <h3 className="mb-3 text-lg font-semibold">Daily Usage</h3>
//           <UsageLine data={dummyTrend} />
//         </Panel>
//         <Panel>
//           <h3 className="mb-3 text-lg font-semibold">Weekly Usage</h3>
//           <UsageBars
//             data={dummyTrend.map((d, i) => ({
//               label: `W${i + 1}`,
//               liters: d.liters + 20,
//             }))}
//           />
//         </Panel>
//       </div>

//       <div className="mt-6 grid gap-6 md:grid-cols-2">
//         <Panel>
//           <h3 className="mb-3 text-lg font-semibold">Challenges</h3>
//           <div className="space-y-4">
//             {[
//               { title: "7-day Shower Saver", progress: 60 },
//               { title: "Kitchen Efficiency", progress: 35 },
//             ].map((c) => (
//               <div
//                 key={c.title}
//                 className="rounded-xl border border-slate-100 p-4"
//               >
//                 <div className="flex items-center justify-between">
//                   <p className="font-medium">{c.title}</p>
//                   <span className="text-sm text-slate-500">
//                     {c.progress}%
//                   </span>
//                 </div>
//                 <div className="mt-2">
//                   <Progress value={c.progress} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Panel>

//         <Panel>
//           <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
//           <div className="grid gap-3 sm:grid-cols-2">
//             {[
//               { href: "/usage", label: "Add Usage" },
//               { href: "/challenges", label: "Challenges" },
//               { href: "/leaderboard", label: "Leaderboard" },
//               { href: "/sensor", label: "Leakage Sensor" },
//             ].map((q) => (
//               <a
//                 key={q.href}
//                 href={q.href}
//                 className="btn btn-outline"
//               >
//                 {q.label}
//               </a>
//             ))}
//           </div>
//         </Panel>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import Panel from "../components/Panel";
import Progress from "../components/Progress";
import UsageLine from "../components/UsageLine";
import UsageBars from "../components/UsageBars";
import { api, unwrap } from "../services/api";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalUsage: 0,
    totalSavings: 0,
    badges: 0,
  });

  const [dailyUsage, setDailyUsage] = useState([]);
  const [weeklyUsage, setWeeklyUsage] = useState([]);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    (async () => {
      // Fetch summary stats
      const [summaryData, summaryErr] = await unwrap(api.get("/usage/total"));
      if (summaryData) {
        setSummary({
          totalUsage: summaryData.total,
          totalSavings: summaryData.savings,
          badges: summaryData.badges?.length || 0,
        });
      }
      if (summaryErr) console.error("Error fetching summary:", summaryErr);

      // Fetch daily usage
      const [dailyData, dailyErr] = await unwrap(api.get("/usage/mine"));
      if (dailyData) {
        const trend = dailyData.map((d, i) => ({
          label: `Day ${i + 1}`,
          liters: d.liters ?? d.amount,
        }));
        setDailyUsage(trend);

        // Weekly usage as sum of every 7 days
        const weeks = [];
        for (let i = 0; i < trend.length; i += 7) {
          const weekLiters = trend.slice(i, i + 7).reduce((sum, x) => sum + x.liters, 0);
          weeks.push({ label: `W${weeks.length + 1}`, liters: weekLiters });
        }
        setWeeklyUsage(weeks);
      }
      if (dailyErr) console.error("Error fetching daily usage:", dailyErr);

      // Fetch challenges
      const [challengeData, challengeErr] = await unwrap(api.get("/challenges"));
      if (challengeData) {
        setChallenges(challengeData.map(c => ({ ...c, joined: c.joined || false })));
      }
      if (challengeErr) console.error("Error fetching challenges:", challengeErr);
    })();
  }, []);

  return (
    <div className="container-narrow">
      <h2 className="mt-6 text-2xl font-bold">Dashboard</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard title="Total Usage (L)" value={summary.totalUsage} icon="📈" />
        <StatCard
          title="Total Savings (L)"
          value={summary.totalSavings}
          icon="💰"
          accent="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Badges"
          value={summary.badges}
          icon="🏅"
          accent="from-sky-500 to-indigo-500"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h3 className="mb-3 text-lg font-semibold">Daily Usage</h3>
          <UsageLine data={dailyUsage.length ? dailyUsage : [{ label: "Day 1", liters: 0 }]} />
        </Panel>
        <Panel>
          <h3 className="mb-3 text-lg font-semibold">Weekly Usage</h3>
          <UsageBars data={weeklyUsage.length ? weeklyUsage : [{ label: "W1", liters: 0 }]} />
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Panel>
          <h3 className="mb-3 text-lg font-semibold">Challenges</h3>
          <div className="space-y-4">
            {challenges.length ? challenges.map(c => (
              <div key={c.id} className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{c.title}</p>
                  <span className="text-sm text-slate-500">
                    {Math.round((c.progress / c.goal) * 100) || 0}%
                  </span>
                </div>
                <div className="mt-2"><Progress value={Math.round((c.progress / c.goal) * 100) || 0} /></div>
              </div>
            )) : <p className="text-slate-500">No challenges yet.</p>}
          </div>
        </Panel>

        <Panel>
          <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/usage", label: "Add Usage" },
              { href: "/challenges", label: "Challenges" },
              { href: "/leaderboard", label: "Leaderboard" },
              { href: "/sensor", label: "Leakage Sensor" },
            ].map(q => (
              <a key={q.href} href={q.href} className="btn btn-outline">{q.label}</a>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
