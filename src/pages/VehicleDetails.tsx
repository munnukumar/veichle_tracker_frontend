import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehicleById, getUserProfile } from "../api/authApi";
// import { getUserProfile } from "../api/authApi";

type VehicleType = {
  _id: string;
  vehicleId: {
    _id: string;
    title: string;
    image: string;
    type: string;
    color?: string;
    price: number;
    brand?: string;
    model?: string;
    description?: string;
  };
  isAvailable: boolean;
};

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await getVehicleById(id);
        const data = res?.data?.data;

        if (!data || !data.vehicleId) {
          alert("Vehicle not found");
          navigate("/vehicles");
          return;
        }

        setVehicle(data);
      } catch (err) {
        console.log("Error fetching vehicle:", err);
        alert("Error fetching vehicle");
        navigate("/vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, navigate]);

  const handleBookNow = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert(
          "Your token is expired or something went wrong please login again"
        );
        navigate("/login");
      }

      const userData = await getUserProfile();
      console.log("userData ==> ", userData);
      if (!userData) {
        alert("Unable to fetch user details.");
        return;
      }
      const user = userData?.data?.data;
      console.log("user ====> ", user);
      console.log("kyc ==> ", user.kyc.status);

      if (user.kyc.status !== "VERIFIED") {
        if (window.confirm("Your KYC is pending. Complete KYC now?")) {
          navigate("/kyc"); // redirect to KYC page
        }
        return;
      }
      navigate(`/book/${id}`);
    } catch (err) {
      console.log("KYC check error:", err);
      alert("Something went wrong");
    }
  };

  if (loading)
    return (
      <p className="min-h-screen flex justify-center items-center text-xl font-bold">
        Loading vehicle...
      </p>
    );

  if (!vehicle) return null;

  const v = vehicle.vehicleId;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow">
        <img
          src={v.image || "https://via.placeholder.com/400"}
          alt={v.title}
          className="w-full h-64 object-cover rounded-xl"
        />

        <h1 className="text-3xl font-bold mt-4">{v.title}</h1>
        <p className="text-gray-600 text-lg">{v.color}</p>
        <p className="text-gray-600 text-lg">{v.type}</p>
        <p className="text-gray-600 text-lg">{v.brand}</p>
        <p className="text-gray-600 text-lg">{v.model}</p>
        <p className="text-gray-600 text-lg">{v.description}</p>

        <p className="text-xl font-semibold mt-3">Price: ₹{v.price}/day</p>

        <p className="mt-2 font-bold">
          {vehicle.isAvailable ? (
            <span className="text-green-600">Available</span>
          ) : (
            <span className="text-red-600">Not Available</span>
          )}
        </p>
        <button
          onClick={handleBookNow}
          className="w-full bg-red-600 text-white p-3 rounded hover:bg-green-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
