import React from "react";

export default function loading() {
  return (
    <div className="mx-auto my-5 max-w-5xl px-3">
      <h1 className=" text-4xl text-center font-bold mb-5 underline underline-offset-4 ">
        Admin Approval
      </h1>
      <div className="min-w-full rounded-md animate-pulse  min-h-[15vh] bg-gray-200"></div>
    </div>
  );
}
