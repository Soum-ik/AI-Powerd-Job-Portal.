"use client";
import { apiUrl } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
function Page() {
  const [loading, setLoading] = useState(false);
  const [opt, setOpt] = useState(null);
  const router = useRouter();
  const handleChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/Userauth/recovery`, {
        body: JSON.stringify(opt),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data, "result");
      setLoading(false);

      if (data.status === 200) {
        toast.success(data.message);
        router.replace("/auth/login/new-password");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className=" fixed bg-white text-white inset-0 flex items-center justify-center">
      <form
        // onSubmit={handleSubmit}
        className="bg-neutral-800 p-8 mt-20 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className=" flex    justify-between">
          <h2 className="text-2xl font-bold mb-6">Send Otp</h2>
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={opt}
            placeholder=" Enter your email 6 digit code please"
            onChange={(e) => setOpt(e.target.value)}
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
