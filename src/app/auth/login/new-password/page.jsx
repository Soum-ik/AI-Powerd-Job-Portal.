"use client";
import { apiUrl } from "@/lib/config";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    opt: 0,
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
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}Userauth/recovery`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data, "data");
      setLoading(false);
      if (data.status === 200) {
        router.replace("/auth/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(formData, "data");
  return (
    <div className=" fixed bg-white text-white inset-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-8 mt-20 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className=" flex    justify-between">
          <h2 className="text-2xl font-bold mb-6">New Password</h2>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            placeholder=" Enter your email please"
            className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Password
          </label>
          <input
            id="email"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            placeholder=" Enter your password"
            className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Otp
          </label>
          <input
            id="email"
            name="opt"
            value={formData.opt}
            onChange={(e) => handleChange(e)}
            placeholder=" Enter your opt please"
            className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        <button
          type="submit"
          onClick={handleChange}
          disabled={loading}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          {loading ? `loading...` : `Send`}
        </button>

        <Toaster position="bottom-right" />
      </form>
    </div>
  );
}

export default Page;
