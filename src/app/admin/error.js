"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <div className="mx-auto my-20 max-w-5xl p-3">
      <h2 className="text-center text-3xl font-semibold text-neutral-800">
        This user is not eligible for this route
      </h2>
    </div>
  );
}
