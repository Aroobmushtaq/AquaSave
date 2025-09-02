import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const nav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/usage", label: "Usage" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/sensor", label: "Leakage Sensor" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token")); // check login status

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
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-sky-500 text-white shadow">
            🌊
          </span>
          <span className="text-teal-700">AquaSave</span>
        </Link>

        {/* Navigation Links */}
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

        {/* Logout Button (only when logged in) */}
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <button
              onClick={logout}
              className="btn btn-outline hidden md:inline-flex"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
