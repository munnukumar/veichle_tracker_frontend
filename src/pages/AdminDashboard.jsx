export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Total Vehicles</h2>
          <p className="text-3xl font-bold mt-2">14</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Active Bookings</h2>
          <p className="text-3xl font-bold mt-2">92</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">Today's Revenue</h2>
          <p className="text-3xl font-bold mt-2">₹ 18,920</p>
        </div>

      </div>

      <div className="mt-10 bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
        <p className="text-gray-500 mt-2">Bookings list will appear here...</p>
      </div>
    </div>
  );
}
