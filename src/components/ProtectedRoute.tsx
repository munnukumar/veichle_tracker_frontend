import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string;
}

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role")?.trim().toUpperCase(); // normalize

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role.toUpperCase()) {
    // Logged in but role doesn't match
    alert("Access denied! Only authorized users can access this page.");
    return <Navigate to="/login" replace />;
  }

  // Authorized
  return <>{children}</>;
}
