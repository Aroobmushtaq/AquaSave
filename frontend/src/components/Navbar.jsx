// import React from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";


// const nav = [
//     { to: "/dashboard", label: "Dashboard" },
//     { to: "/usage", label: "Usage" },
//     { to: "/challenges", label: "Challenges" },
//     { to: "/leaderboard", label: "Leaderboard" },
//     { to: "/sensor", label: "Leakage Sensor" },
//     { to: "/profile", label: "Profile" },
// ];


// export default function Navbar() {
//     const navigate = useNavigate();
//     const logout = () => { localStorage.removeItem("token"); navigate("/login"); };


//     return (
//         <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}
//             className="sticky top-0 z-40 border-b border-teal-100/60 bg-white/70 backdrop-blur">
//             <div className="container-narrow flex h-16 items-center justify-between">
//                 <Link to="/" className="flex items-center gap-2 font-semibold">
//                     <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-sky-500 text-white shadow">🌊</span>
//                     <span className="text-teal-700">AquaSave</span>
//                 </Link>


//                 <nav className="hidden gap-4 md:flex">
//                     {nav.map((n) => (
//                         <NavLink key={n.to} to={n.to} className={({ isActive }) =>
//                             `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:text-teal-700'}`
//                         }>
//                             {n.label}
//                         </NavLink>
//                     ))}
//                 </nav>


//                 <div className="flex items-center gap-2">
//                     <button onClick={logout} className="btn btn-outline hidden md:inline-flex">Logout</button>
//                     <MobileMenu />
//                 </div>
//             </div>
//         </motion.header>
//     );
// }


// function MobileMenu() {
//     const navigate = useNavigate();
//     const [open, setOpen] = React.useState(false);
//     return (
//         <div className="md:hidden">
//             <button onClick={() => setOpen((v) => !v)} className="btn btn-outline" aria-label="Toggle menu">☰</button>
//             {open && (
//                 <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 right-0 mt-2 border-t border-teal-100/70 bg-white/90 backdrop-blur">
//                     <div className="container-narrow grid gap-1 py-3">
//                         {nav.map((n) => (
//                             <button key={n.to} onClick={() => { setOpen(false); navigate(n.to); }} className="rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-teal-50">
//                                 {n.label}
//                             </button>
//                         ))}
//                         <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} className="rounded-xl px-3 py-2 text-left text-teal-700 hover:bg-teal-50">Logout</button>
//                     </div>
//                 </motion.div>
//             )}
//         </div>
//     );
// }


import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const nav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/usage", label: "Usage" },
  { to: "/challenges", label: "Challenges" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/sensor", label: "Leakage Sensor" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 border-b border-teal-100/60 bg-white/70 backdrop-blur"
    >
      <div className="container-narrow flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-sky-500 text-white shadow">
            🌊
          </span>
          <span className="text-teal-700">AquaSave</span>
        </Link>

        <nav className="hidden gap-4 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-600 hover:text-teal-700"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={logout} className="btn btn-outline hidden md:inline-flex">
            Logout
          </button>
          <MobileMenu logout={logout} />
        </div>
      </div>
    </motion.header>
  );
}

function MobileMenu({ logout }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleNavClick = (to) => {
    setOpen(false);
    navigate(to);
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn btn-outline"
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 mt-2 border-t border-teal-100/70 bg-white/90 backdrop-blur"
        >
          <div className="container-narrow grid gap-1 py-3">
            {nav.map((n) => (
              <button
                key={n.to}
                onClick={() => handleNavClick(n.to)}
                className="rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-teal-50"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="rounded-xl px-3 py-2 text-left text-teal-700 hover:bg-teal-50"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
