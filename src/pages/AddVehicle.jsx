import { useState } from "react";
import { addVehicleApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function AddVehicle() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    type: "Four Wheeler",
    numberPlate: "",
    brand: "",
    model: "",
    color: "",
    price: "",
    description: ""
  });

  const [image, setImage] = useState();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, (form)[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    console.log("image : ", image)

    try {
      await addVehicleApi(formData);
      console.log("fromData : ", formData)

      alert("Vehicle added successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.log("Error adding vehicle", err);
      alert("Failed to add vehicle");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-2xl"
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold mb-6">Add New Vehicle</h1>

        <input
          type="text"
          name="title"
          placeholder="Vehicle Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
          required
        >
          <option value="Four Wheeler">Four Wheeler</option>
          <option value="Two Wheeler">Two Wheeler</option>
        </select>

        <input
          type="text"
          name="numberPlate"
          placeholder="Number Plate"
          value={form.numberPlate}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={form.color}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="number"
          name="price"
          placeholder="Price Per Day"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        {/* IMAGE UPLOAD FIELD */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border rounded mb-4"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
          rows={4}
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Add Vehicle
        </button>
      </form>
    </div>
  );
}
