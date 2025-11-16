// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function UserDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    api
      .get(`/event-registration-service/registrations/user/${userId}`)
      .then((res) => setRegistrations(res.data))
      .catch(() => alert("Failed to load registrations"));
  }, [userId]);

  return (
  <div>user Page</div>
  );
}
