import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehicleById, createBooking } from "../api/authApi";

type VehicleType = {
  _id: string;
  vehicleId: {
    _id: string;
    title: string;
    image: string;
    type: string;
    price: number;
  };
  isAvailable: boolean;
};

export default function BookingPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking form state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //   console.log("vehicleId : ", ve)

  // Fetch vehicle details
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await getVehicleById(vehicleId);
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
  }, [vehicleId, navigate]);

  // Handle Booking Submission
  const handleBooking = async () => {
    if (!vehicleId) {
      alert("Invalid vehicle ID.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
        const sendData = {
            vehicleId: vehicleId,
            from : startDate,
            to : endDate
        }
      const res = await createBooking(sendData);

      alert("Booking successful!");
      navigate("/my-bookings"); // redirect to user bookings page
    } catch (err) {
      console.log("Booking error:", err);
      alert("Failed to book vehicle.");
    }
  };

  if (loading)
    return (
      <p className="min-h-screen flex justify-center items-center text-xl font-bold">
        Loading booking page...
      </p>
    );

  if (!vehicle) return null;

  const v = vehicle.vehicleId;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Booking: {v.title}</h1>
        <img
          src={v.image || "https://via.placeholder.com/400"}
          alt={v.title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />

        <p className="text-xl font-semibold mb-2">Price: ₹{v.price}/day</p>
        <p className="text-gray-600 mb-4">Type: {v.type}</p>

        <div className="flex flex-col gap-4">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 mt-4"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
