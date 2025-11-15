// src/components/ProfileDropdown.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const readRole = () => {
    const r = localStorage.getItem("role");
    if (r) return r.toLowerCase();
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      return (u.role || "").toLowerCase();
    } catch {
      return null;
    }
  };

  const role = readRole(); // "admin" or "student" (or "user")

  const goToDashboard = () => {
    setOpen(false); // close dropdown before navigating
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  const handleEvents = () => {
    setOpen(false);
    navigate("/events");
  };

  const handleLogout = () => {
    setOpen(false);
    localStorage.clear();
    // notify listeners
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const iconColorClass = role === "admin" ? "text-red-600" : "text-green-600";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className={`w-10 h-10 flex items-center justify-center rounded-full border shadow-sm bg-gray-100 hover:bg-gray-200 ${iconColorClass}`}
        aria-label="Profile"
      >
        <span className="text-sm font-semibold">{role === "admin" ? "A" : "S"}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-xl p-2 z-50">
          <button onClick={goToDashboard} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
            Dashboard
          </button>

          <button onClick={handleEvents} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
            Events
          </button>

          <hr className="my-2" />

          <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
