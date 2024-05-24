import React from "react";
import FancyText from "../../components/shared/FancyText";
function loading() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div className="max-w-5xl  z-0 space-y-2 my-10 md:mx-auto mx-5     rounded-md ">
      <h1 className="text-4xl text-center font-bold mt-5 text-neutral-900">
        Admin <FancyText className={"mr-0 p-0 rotate-1"}>Dash</FancyText>board
      </h1>
      <h2 className=" my-4 text-lg font-semibold">Unapproved Jobs:</h2>

      <div className="min-w-full rounded-md animate-pulse  min-h-[5vh] bg-gray-200"></div>
      <div className="min-w-full rounded-md animate-pulse  min-h-[2vh] bg-gray-200"></div>

      {numbers.map((number, i) => (
        <div
          key={i}
          className="min-w-full rounded-md animate-pulse  min-h-[15vh] bg-gray-200"
        ></div>
      ))}
    </div>
  );
}

export default loading;
