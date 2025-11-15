// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Not logged in → redirect
  if (!token) return <Navigate to="/login" replace />;

  // Role mismatch → redirect home
  if (role && user.role !== role) return <Navigate to="/" replace />;

  // Allow access
  return <Outlet />;
}
