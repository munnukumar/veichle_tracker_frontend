import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await loginApi(form);

      //     console.log("res : ", res);

      //   console.log("accessToken : ", res.data.data.tokens.accessToken);
      //   console.log("role : ", res.data.data.user.role);

      localStorage.setItem("accessToken", res.data.data.tokens.accessToken);
      localStorage.setItem("refreshToken", res.data.data.tokens.refreshToken);

      localStorage.setItem("role", res.data.data.user.role);

      if (res.data.data.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/vehicles");
      }
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 shadow rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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

        <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a className="text-blue-600 font-medium" href="/signup">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
