// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const updateAuth = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");

      setIsLoggedIn(!!token);
      setRole(userRole || null);
    };

    // Listen for login / logout updates
    window.addEventListener("authChange", updateAuth);

    // Initial check
    updateAuth();

    return () => window.removeEventListener("authChange", updateAuth);
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        CEMS
      </Link>

      <div className="flex items-center gap-6">
        
        <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium">
          Home
        </Link>

        {/* SHOW LOGIN BUTTON IF NOT LOGGED IN */}
        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Signup / Login
          </button>
        ) : (
          <ProfileDropdown role={role} />
        )}
      </div>
    </nav>
  );
}
