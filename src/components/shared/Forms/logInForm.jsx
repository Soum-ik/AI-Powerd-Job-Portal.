"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaWindowClose } from "react-icons/fa";
import { apiUrl } from "@/lib/config";
console.log(apiUrl, 'api url');
const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch(`${apiUrl}Userauth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.status === 200) {
        setLoading(false);
        router.refresh();
        toast.success("Login successful!");

        router.replace("/");
        return;
      }
      if (responseData.status === 204) {
        setLoading(false);
        toast.error(responseData.message);
        return;
      }
      toast.error("Something want wrong");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-20 w-full max-w-sm rounded-lg bg-neutral-800 p-8 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold">Sign In</h2>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-gray-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-gray-700"
      >
        {loading ? `loading...` : `Sign In`}
      </button>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={() => setPopUp(!popUp)} className="text-sm">
          Forgot Password ?
        </button>
        <Link
          href={"/auth/signup"}
          className="text-sm"
        >{`Have No Account`}</Link>
      </div>
      <Toaster position="top-center" />

      {/* For forgot password */}
      {popUp && <ForgotPassword onClose={() => setPopUp(!popUp)} />}
    </form>
  );
};

export default SignInForm;

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}Userauth/recovery?email=${email}`);
      const data = await response.json();
      setLoading(false);

      if (data.status === 200) {
        toast.success(data.message);
        router.replace("/auth/login/vaild-code");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <form
        // onSubmit={handleSubmit}
        className="mt-20 w-full max-w-sm rounded-lg bg-neutral-800 p-8 shadow-md"
      >
        <div className="flex justify-between">
          <h2 className="mb-6 text-2xl font-bold">Forgot Password</h2>
          <div onClick={onClose}>
            <FaWindowClose size={25} />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder=" Enter your email please"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        <button
          type="submit"
          onClick={handleChange}
          disabled={loading}
          className="w-full rounded-md bg-gray-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-gray-700"
        >
          {loading ? `loading...` : `Send`}
        </button>

        <Toaster position="top-center" />
      </form>
    </div>
  );
};
