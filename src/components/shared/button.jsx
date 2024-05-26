"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormStatus } from "react-dom";

export default function Button({ className, children, fun }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        className,
        " flex items-center justify-center gap-2 text-center"
      )}
      onClick={async () => {
        await fun();
      }}
    >
      {pending ? <Spinning /> : children}
    </button>
  );
}

function Spinning() {
  return (
    <>
      <div className=" rounded-full border-b border-t border-white animate-spin border-2 size-5 tabular-nums"></div>
      <p>Searching..</p>
    </>
  );
}
