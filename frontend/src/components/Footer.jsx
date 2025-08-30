export default function Footer() {
return (
<footer className="mt-16 border-t border-teal-100/60 bg-white/60 backdrop-blur">
<div className="container-narrow py-6 text-center text-sm text-slate-500">
© {new Date().getFullYear()} AquaSave · Built with 💧 to save every drop
</div>
</footer>
);
}