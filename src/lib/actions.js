"use server";

import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export async function filterJobs(formData) {
  const values = Object.fromEntries(formData.entries());
  const { q, location, type } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
  });
  redirect(`/?${searchParams.toString()}`);
}