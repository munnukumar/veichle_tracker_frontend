import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import AdminSidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

export default function MainLayout() {
  const location = useLocation();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  // Routes where navbar should not appear
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  const isAdmin = role === "ADMIN";

  return (
    <div className="flex">
      {/* ADMIN SIDEBAR ONLY */}
      {!shouldHideNavbar && isAdmin && <AdminSidebar />}

      <div className={isAdmin ? "ml-64 w-full" : "w-full"}>
        {/* NAVBAR (Hidden on Login/Signup) */}
        {!shouldHideNavbar && <Navbar />}

        <Outlet />
      </div>
    </div>
  );
}
