import { useEffect, useState } from "react";
import { getAllVehicles } from "../api/authApi";
import { Link } from "react-router-dom";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      const res = await getAllVehicles();
      const list = res?.data?.data;

      // Filter out any vehicles where vehicleId is null
      if (Array.isArray(list)) {
        setVehicles(list.filter((v) => v.vehicleId));
      } else {
        setVehicles([]); // fallback to empty array
      }
    } catch (err) {
      console.log("Error loading vehicles", err);
      setVehicles([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-bold">
        Loading vehicles...
      </div>
    );

  if (vehicles.length === 0)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 text-xl font-bold">
        No vehicles available.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">All Vehicles</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((v) => {
          // Skip if vehicleId is missing
          if (!v.vehicleId) return null;

          return (
            <div
              key={v._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-100"
            >
              <Link to={`/vehicle/${v.vehicleId._id}`}>
                <img
                  src={v.vehicleId.image || "https://via.placeholder.com/200"}
                  alt={v.vehicleId.title}
                  className="w-full h-40 object-cover rounded-lg cursor-pointer"
                />
              </Link>

              <h2 className="text-xl font-bold mt-3">{v.vehicleId.title}</h2>
              <p className="text-gray-600">{v.vehicleId.type}</p>

              <p className="font-semibold mt-2">
                Price: ₹{v.vehicleId.price}/day
              </p>

              <p
                className={`mt-2 font-bold ${
                  v.isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {v.isAvailable ? "Available" : "Not Available"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
