import React from "react";

function Loading() {
  return (
    <div className="max-w-5xl  space-y-2 my-10 md:mx-auto mx-5     rounded-md ">
      <div className="min-w-full rounded-md animate-pulse  min-h-[10vh] bg-gray-200"></div>
      <div className="min-w-full rounded-md animate-pulse  min-h-[30vh] bg-gray-200"></div>
      <div className="min-w-full rounded-md animate-pulse  min-h-[50vh] bg-gray-200"></div>
    </div>
  );
}

export default Loading;
