"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { apiUrl } from "../../../lib/config";
import Link from "next/link"; 

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    image: "",
    confirmPassword: "",
  });

  console.log(formData, "form data");

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
      const res = await fetch(`${apiUrl}Userauth/signup`, {
        body: JSON.stringify(formData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res, "before getting api respnonse");
      const data = await res.json();
      console.log(data, "after  getting api respnonse");

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
          image: "",

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
    <div className="mt-20 flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg bg-gray-800 p-8 shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold">Sign Up</h2>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your valid Email"
            id="email"
            name="email"
            onChange={(e) => handleChange(e)}
            value={formData.email}
            className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="email">
            Image Url
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter your Image Url"
            onChange={(e) => handleChange(e)}
            value={formData.image}
            className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your Name"
            id="name"
            name="name"
            onChange={(e) => handleChange(e)}
            value={formData.name}
            className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter your Password"
            onChange={(e) => handleChange(e)}
            value={formData.password}
            className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-medium"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="text"
            placeholder="Enter your Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            value={formData.confirmPassword}
            className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-md bg-gray-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-gray-700"
        >
          {loading ? `loadig...` : `Sign Up`}
        </button>
        <div className="mt-4">
          <Link href={"/auth/login"}>Already Have Account.</Link>
        </div>
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default SignUpForm;
