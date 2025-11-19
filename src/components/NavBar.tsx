import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const r = localStorage.getItem("role");
    setRole(r as "ADMIN" | "USER" | null);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">Vehicle Rental</h1>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">

        {/* Visible to all logged-in users */}
        <Link className="hover:text-blue-600 font-medium" to="/vehicles">
          Vehicles
        </Link>

        <Link className="hover:text-blue-600 font-medium" to="/bookings">
          My Bookings
        </Link>

        {/* Admin Only → Add Vehicle */}
        {role === "ADMIN" && (
          <Link
            className="hover:text-blue-600 font-medium"
            to="/admin/add-vehicle"
          >
            Add Vehicle
          </Link>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
