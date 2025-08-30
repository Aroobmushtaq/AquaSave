import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export default function Home() {
return (
<div className="container-narrow">
<section className="mx-auto mt-10 grid items-center gap-10 md:grid-cols-2">
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
<h1 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
Save water. <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">Track smart.</span>
</h1>
<p className="mt-4 text-slate-600">
AquaSave helps you monitor daily water usage, detect leaks early, and compete in challenges to build planet-friendly habits.
</p>
<div className="mt-6 flex gap-3">
<Link to="/register" className="btn btn-primary">Get Started</Link>
<Link to="/login" className="btn btn-outline">Login</Link>
</div>
</motion.div>
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
className="card grid place-items-center p-6">
<div className="aspect-square w-72 rounded-3xl bg-gradient-to-br from-teal-400/30 to-sky-400/30 p-6">
<div className="h-full w-full rounded-2xl border border-teal-200/60 bg-white/60 p-6">
<div className="grid h-full place-items-center text-6xl">💧</div>
</div>
</div>
</motion.div>
</section>


<section className="mt-16 grid gap-6 md:grid-cols-3">
{[
{ t: "Track Usage", d: "Log drinking, washing, gardening and more.", i: "📊" },
{ t: "Detect Leaks", d: "Real-time alerts to stop waste early.", i: "🚨" },
{ t: "Save Together", d: "Join challenges & climb the leaderboard.", i: "🏆" },
].map((f) => (
<div key={f.t} className="card p-5">
<div className="text-3xl">{f.i}</div>
<h3 className="mt-2 text-lg font-semibold">{f.t}</h3>
<p className="text-slate-600">{f.d}</p>
</div>
))}
</section>
</div>
);
}