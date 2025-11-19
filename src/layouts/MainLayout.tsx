import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function MainLayout() {
  const location = useLocation();

  // Routes where navbar should not appear
  const hideNavbarRoutes = ["/login", "/signup"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
}
