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
      <Link to={role === "ADMIN" ? "/admin/dashboard" : "/"}>
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer hover:underline">
          Vehicle Rental
        </h1>
      </Link>

      {/* -------- USER NAV LINKS -------- */}
      {role === "USER" && (
        <div className="flex gap-6 items-center">
          <Link className="hover:text-blue-600 font-medium" to="/vehicles">
            Vehicles
          </Link>

          <Link className="hover:text-blue-600 font-medium" to="/my-bookings">
            My Bookings
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}

      {/* -------- ADMIN NAV LINKS (ONLY LOGOUT) -------- */}
      {/* {role === "ADMIN" && (
        <div className="flex gap-6 items-center">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )} */}
    </nav>
  );
}
