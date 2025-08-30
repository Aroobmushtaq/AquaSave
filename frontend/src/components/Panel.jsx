export default function Panel({ children }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}
