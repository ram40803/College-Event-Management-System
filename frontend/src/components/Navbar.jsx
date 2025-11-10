import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
        <CalendarDays className="w-6 h-6" />
        <Link to="/">CEMS</Link>
      </div>

      <ul className="flex gap-6 text-gray-700 font-medium">
        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        <li><a href="#events" className="hover:text-blue-600">Events</a></li>
        <li><a href="#about" className="hover:text-blue-600">About</a></li>
        <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
      </ul>

      <Link
        to="/login"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Login / Signup
      </Link>
    </nav>
  );
}
