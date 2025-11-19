import axios from "axios";

const API = "http://localhost:8000/api";

export const loginApi = async (data: any) => {
  return axios.post(`${API}/users/login`, data);
};

export const signupApi = async (data: any) => {
  return axios.post(`${API}/users/create`, data);
};

export const getAllVehicles = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API}/availability/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const getVehicleById = async (id:any) => {
  const token = localStorage.getItem("token");
console.log("id : ", id);
  return axios.get(`${API}/availability/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};