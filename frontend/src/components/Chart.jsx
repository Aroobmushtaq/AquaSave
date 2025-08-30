import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";


export function UsageLine({ data }) {
return (
<div className="h-64">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="label" />
<YAxis />
<Tooltip />
<Line type="monotone" dataKey="liters" stroke="#14b8a6" strokeWidth={3} dot={false} />
</LineChart>
</ResponsiveContainer>
</div>
);
}


export function UsageBars({ data }) {
return (
<div className="h-64">
<ResponsiveContainer width="100%" height="100%">
<BarChart data={data}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="label" />
<YAxis />
<Tooltip />
<Bar dataKey="liters" fill="#0ea5e9" radius={[8,8,0,0]} />
</BarChart>
</ResponsiveContainer>
</div>
);
}