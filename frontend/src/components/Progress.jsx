export default function Progress({ value }) {
  return (
    <div className="h-2 w-full rounded bg-slate-200">
      <div
        className="h-2 rounded bg-emerald-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
