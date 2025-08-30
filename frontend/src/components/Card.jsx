import { motion } from "framer-motion";


export function StatCard({ title, value, icon, accent="from-teal-500 to-sky-500" }) {
return (
<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
className="card p-5">
<div className="flex items-center justify-between">
<div>
<p className="text-sm text-slate-500">{title}</p>
<p className="mt-1 text-2xl font-semibold text-slate-800">{value}</p>
</div>
<div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${accent} grid place-items-center text-white text-xl`}>{icon ?? "💧"}</div>
</div>
</motion.div>
);
}


export function Panel({ children, className = "" }) {
return <div className={`card p-5 ${className}`}>{children}</div>;
}


export function Progress({ value }) {
return (
<div className="h-3 w-full rounded-full bg-slate-100">
<div className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-sky-500" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
</div>
);
}