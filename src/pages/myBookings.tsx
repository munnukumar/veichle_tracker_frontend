import { useEffect, useState } from "react";
import { getUserBookings, cancelBookings } from "../api/authApi";
import { openRazorpayCheckout } from "../utils/LoadRazorpay";

type BookingType = {
  _id: string;
  from: Date;
  to: Date;
  totalAmount: number;
  vehicleId: {
    _id: string;
    title: string;
    type: string;
    image?: string;
    price: number;
  };
  status: "PENDING" | "CONFIRMED" | "CANCEllED" | "COMPLETED";
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getUserBookings();
        console.log("My bookings → ", res.data.data);
        setBookings(res.data.data || []);
      } catch (err) {
        console.log("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handlePayment = async (booking: BookingType) => {
    await openRazorpayCheckout(booking);
  };

  const handleCancelBooking = async (id: any) => {
    await cancelBookings(id);
  };

  // const handleRemoveCart = async (id: any) => {
  //   await cancelBookings(id);
  // };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading bookings...
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        No bookings found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white p-5 rounded-xl shadow flex gap-4"
          >
            <img
              src={b.vehicleId.image || "https://via.placeholder.com/150"}
              alt={b.vehicleId.title}
              className="w-32 h-24 object-cover rounded-lg"
            />

            <div className="flex-1 flex flex-col justify-between">
              <h2 className="text-xl font-bold">{b.vehicleId.title}</h2>
              <p className="text-gray-600">Type: {b.vehicleId.type}</p>

              <p className="text-gray-600">
                From: {new Date(b.from).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                To: {new Date(b.to).toLocaleDateString()}
              </p>

              <p className="text-lg font-semibold text-gray-800">
                Total Amount: ₹{b.totalAmount}
              </p>

              <p
                className={`font-bold ${
                  b.status === "CONFIRMED"
                    ? "text-green-600"
                    : b.status === "PENDING"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {b.status.toUpperCase()}
              </p>

              {b.status === "PENDING" && (
                <button
                  className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={() => handlePayment(b)}
                >
                  Pay Now
                </button>
              )}
              {!["COMPLETED", "CANCELLED"].includes(b.status) && (
                <button
                  className="mt-3 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                  onClick={() => handleCancelBooking(b._id)}
                >
                  Cancel Booking
                </button>
              )}

              {/* {["COMPLETED", "CANCELLED"].includes(b.status) && (
                <button
                  className="mt-3 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                  onClick={() => handleRemoveCart(b._id)}
                >
                  Remove
                </button>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
