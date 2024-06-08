"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaWindowClose } from "react-icons/fa";
import { apiUrl } from "@/lib/config";

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
      const response = await fetch(`https://sylhet-job.vercel.app/api/Userauth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.status === 200) {
        setLoading(false);
        router.push("/jobs/new");
        toast.success("Login successful!");
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
      className="bg-neutral-800 p-8 mt-20 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        {loading ? `loading...` : `Sign In`}
      </button>

      <div className=" flex items-center justify-between mt-5">
        <button onClick={() => setPopUp(!popUp)} className=" text-sm">
          Forgot Password ?
        </button>
        <Link
          href={"/auth/signup"}
          className=" text-sm"
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
    <div className=" fixed bg-white inset-0 flex items-center justify-center">
      <form
        // onSubmit={handleSubmit}
        className="bg-neutral-800 p-8 mt-20 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className=" flex    justify-between">
          <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
          <div onClick={onClose}>
            <FaWindowClose size={25} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder=" Enter your email please"
            onChange={(e) => setEmail(e.target.value)}
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

        <Toaster position="top-center" />
      </form>
    </div>
  );
};
