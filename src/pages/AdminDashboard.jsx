import { fetchAllVehicleApi, getActiveBookings } from '../api/authApi';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {

  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalBookedVehicles, setTotalBookVehicles] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);

  const getPaymentUI = (status) => {
  switch (status) {
    case "SUCCESS": return <span className="text-green-600">Paid</span>;
    case "PENDING": return <span className="text-yellow-600">Pending</span>;
    case "FAILED": return <span className="text-red-600">Failed</span>;
    case "REFUNDED": return <span className="text-blue-600">Refunded</span>;
    default: return <span className="text-gray-600">Unknown</span>;
  }
};

  const loadDashboardData = async () => {
    try {
      // Total vehicles
      const totalVehicles = await fetchAllVehicleApi();
      setTotalVehicles(totalVehicles.data.data.total);

      // Active booked vehicles
      const bookedVehicles = await getActiveBookings();
      console.log("active : ", bookedVehicles)
      setTotalBookVehicles(bookedVehicles.data.data.activeCount);
console.log("recent : ", bookedVehicles.data.data.history)
      // Recent bookings
      // const recent = await fetchRecentBookings();
      setRecentBookings(bookedVehicles.data.data.history);

    } catch (err) {
      console.log("Dashboard Fetch Error : ", err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Total Vehicles</h2>
          <p className="text-3xl font-bold mt-2">{totalVehicles}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Active Bookings</h2>
          <p className="text-3xl font-bold mt-2">{totalBookedVehicles}</p>
        </div>

        {/* <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Today's Revenue</h2>
          <p className="text-3xl font-bold mt-2">₹ 18,920</p>
        </div> */}

      </div>

      {/* Recent Bookings Table */}
      <div className="mt-10 bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>

        {recentBookings.length === 0 ? (
          <p className="text-gray-500 mt-2">No recent bookings...</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Vehicle</th>
                  <th className="border p-3 text-left">Number Plate</th>
                  <th className="border p-3 text-left">Start Date</th>
                  <th className="border p-3 text-left">Last Date</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Payment Status</th>
                </tr>
              </thead>

              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50">
                    <td className="border p-3">{b.vehicleId?.title}</td>
                    <td className="border p-3">{b.vehicleId?.numberPlate}</td>
                    <td className="border p-3">{new Date(b.from).toLocaleDateString()}</td>
                    <td className="border p-3">{new Date(b.to).toLocaleDateString()}</td>
                    <td className="border p-3">{b.userId?.email}</td>
                    <td className="border p-3 font-semibold">
                      {getPaymentUI(b.paymentStatus)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}
