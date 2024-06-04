"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignUpForm = () => {
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/Userauth/signup", {
        body: JSON.stringify(formData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === 410) {
        setLoading(false);
        const toastMessage = data.message.issues[0].message;
        toast.error(toastMessage);
      } else if (data.status === 400) {
        setLoading(false);
        toast.error(data.message);
      } else if (data.status === 200) {
        setLoading(false);
        toast.success(data.message);
        setFormData({
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        });
        router.replace("/auth/login");
      } else {
        setLoading(false);

        toast.error("Something went wrong");
      } 
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="  flex items-center justify-center  mt-20 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => handleChange(e)}
            value={formData.email}
            className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => handleChange(e)}
            value={formData.name}
            className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={(e) => handleChange(e)}
            value={formData.password}
            className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            value={formData.confirmPassword}
            className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          {loading ? `loadig...` : `Sign Up`}
        </button>
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default SignUpForm;
