import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddVehicle() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") navigate("/vehicles");
  }, []);

  return <div className="p-8">Add Vehicle Page</div>;
}
