import { useState } from "react";
import { signupApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signupApi(form);

      if (res) {
        navigate("/login");
      }
    } catch (err) {
      return toast.error("All fields are required");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 shadow rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <input
          type="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Sign up
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a className="text-blue-600 font-medium" href="/login">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
