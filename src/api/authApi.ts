import axios from "axios";

const API = "http://localhost:8000/api";

export const loginApi = async (data: any) => {
  return axios.post(`${API}/users/login`, data);
};

export const signupApi = async (data: any) => {
  return axios.post(`${API}/users/create`, data);
};

//User/Admin route
export const getUserProfile = async () => {
  const token = localStorage.getItem("accessToken");
  return axios.get(`${API}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//vehicle route
export const getAllVehicles = async () => {
  const token = localStorage.getItem("accessToken");
  return axios.get(`${API}/availability/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getVehicleById = async (id: any) => {
  const token = localStorage.getItem("accessToken");
  return axios.get(`${API}/availability/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addVehicleApi = async (formData: any) => {
  const token = localStorage.getItem("accessToken");

  return axios.post(`${API}/vehicles/add`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Booking
export const createBooking = async (data: {
  vehicleId: string;
  from: string;
  to: string;
}) => {
  const token = localStorage.getItem("accessToken");
  return axios.post(`${API}/bookings/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserBookings = async () => {
  const token = localStorage.getItem("accessToken");
  return axios.get(`${API}/bookings/my-booking`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//payment
export const createOrderApi = (data: any) => {
  const token = localStorage.getItem("accessToken");

  return axios.post(`${API}/payment/order`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const verifyPaymentApi = (data: any) => {
  const token = localStorage.getItem("accessToken");

  return axios.post(`${API}/payment/verify`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
