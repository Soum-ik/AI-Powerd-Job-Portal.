import React from "react";

function FancyText({ children, className }) {
  return (
    <h1
      className={` inline-block rotate-3 mx-2 select-none rounded-md text-neutral-100 bg-neutral-800 px-5 py-1 ${className}
    }`}
    >
      {children}
    </h1>
  );
}

export default FancyText;
