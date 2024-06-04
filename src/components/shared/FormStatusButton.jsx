"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
export default function Button({ className, children }) {
  const { pending, action, data, method } = useFormStatus();
 
  return (
    <div>
      <Toaster position="top-center" />
      <button
        className={cn(
          className,
          " flex items-center justify-center gap-2 text-center"
        )}
      >
        {pending ? <Spinning /> : children}
      </button>
    </div>
  );
}

function Spinning() {
  return (
    <>
      <div className=" rounded-full border-b border-t border-white animate-spin border-2 size-5 tabular-nums"></div>
      <p>Processing...</p>
    </>
  );
}
