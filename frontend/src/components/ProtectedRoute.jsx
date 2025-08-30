import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute() {
const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
return token ? <Outlet /> : <Navigate to="/login" replace />;
}