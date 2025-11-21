import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between fixed left-0 top-0">
      {/* Top Section */}
      <div>
        <h2 className="text-xl font-bold p-4 border-b border-gray-700">
          Admin Panel
        </h2>

        <nav className="flex flex-col mt-4">
          <Link className="py-3 px-4 hover:bg-gray-700" to="/admin/dashboard">
            Dashboard
          </Link>

          <Link className="py-3 px-4 hover:bg-gray-700" to="/admin/users">
            Users
          </Link>

          <Link className="py-3 px-4 hover:bg-gray-700" to="/admin/add-vehicle">
            Add Vehicle
          </Link>

          <Link className="py-3 px-4 hover:bg-gray-700" to="/vehicles">
            Vehicles
          </Link>
        </nav>
      </div>

      {/* Bottom Section - moved slightly up */}
      <div className="border-t border-gray-700 py-4 flex flex-col gap-2">
        <Link className="py-3 px-4 hover:bg-gray-700" to="/admin/profile">
          Profile
        </Link>

        <Link className="py-3 px-4 hover:bg-gray-700" to="/login">
          Logout
        </Link>
      </div>
    </div>
  );
}
