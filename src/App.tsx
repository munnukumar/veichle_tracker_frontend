import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import VehicleList from "./pages/VehicleList";
import VehicleDetails from "./pages/VehicleDetails";
// import Navbar from "./components/NavBar";
import AddVehicle from "./pages/AddVehicle";
import MainLayout from "./layouts/MainLayout";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/myBookings";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-vehicle"
            element={
              <ProtectedRoute role="ADMIN">
                <AddVehicle />
              </ProtectedRoute>
            }
          />
            <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <VehicleList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vehicle/:id"
            element={
              <ProtectedRoute>
                <VehicleDetails />
              </ProtectedRoute>
            }
          />

           <Route
            path="/book/:vehicleId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
