// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

export default function ProtectedRoute({ element, role }) {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  if (role && getUserRole() !== role) return <Navigate to="/" />;
  return element;
}
