"use client";
import { cn } from "@/lib/utils";
import React from "react";

export default function Button({ className, children, fun }) {
  console.log(fun, "this is a funcatio calling here! ");
  return (
    <button
      className={cn(className)}
      onClick={async () => {
        await fun();
      }}
    >
      {`${children}`}
    </button>
  );
}
