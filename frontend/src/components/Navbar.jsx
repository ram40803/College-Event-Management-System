import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        CampusEvent
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/events" className="text-gray-700 hover:text-blue-600">
          Events
        </Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-600">
          Register
        </Link>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

