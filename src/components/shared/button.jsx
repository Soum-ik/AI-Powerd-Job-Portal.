"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormState } from "react-dom";

export default function Button({ className, children, ...props }) {
  const { pending } = useFormState();
  return (
    <button disabled={pending} className={cn(className)} {...props}>
      {pending ? "Searching..." : `${ children }`}
    </button>
  );
}
