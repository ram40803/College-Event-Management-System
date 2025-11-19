// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRegistrations from "./pages/AdminRegistrations";
import AdminPromotionTools from "./pages/AdminPromotionTools";
import AdminCheckIn from "./pages/AdminCheckIn";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminTeam from "./pages/AdminTeam";
import EventDetails from "./pages/EventDetails";
import UpdateEventPage from "./pages/UpdateEventPage";
import AllEventsPage from "./pages/AllEventPage";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/event-details/:id" element={<EventDetails />} />

        {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-event" element={<CreateEvent />} />
        <Route path="/admin/update-event/:id" element={<UpdateEventPage />} />
        <Route path="/admin/registrations" element={<AdminRegistrations />} />
        <Route path="/admin/promotion-tools" element={<AdminPromotionTools />} />
        <Route path="/admin/checkin" element={<AdminCheckIn />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/team" element={<AdminTeam />} />
      </Route>


        {/* Student Protected Routes */}
        <Route element={<ProtectedRoute role="student" />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>

      </Routes>

      <Footer />
    </>
  );
}
