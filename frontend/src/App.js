import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usage from "./pages/Usage";
import Leaderboard from "./pages/Leaderboard";
import LeakageSensor from "./pages/LeakageSensor";

// Page wrapper for animation
const Page = ({ children }) => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.main>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Page><Home /></Page>} />
              <Route path="/register" element={<Page><Register /></Page>} />
              <Route path="/login" element={<Page><Login /></Page>} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Page><Dashboard /></Page>} />
                <Route path="/usage" element={<Page><Usage /></Page>} />
                <Route path="/leaderboard" element={<Page><Leaderboard /></Page>} />
                <Route path="/sensor" element={<Page><LeakageSensor /></Page>} />
              </Route>
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
