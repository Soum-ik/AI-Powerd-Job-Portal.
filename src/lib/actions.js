"use server";

import { jobFilterSchema, userAuthSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import prisma from "./prisma";
// import toast from "react-hot-toast";

export async function filterJobs(formData) {
  await new Promise((resolve, reject) => {
    return setTimeout(() => {
      resolve();
    }, 1000);
  });
  const values = Object.fromEntries(formData.entries());
  const { q, location, type } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
  });
  redirect(`/?${searchParams.toString()}`);
}

export async function createUser(formData) {
  await new Promise((resolve) => {
    return setTimeout(() => {
      resolve();
    }, 1000);
  });
  const valus = Object.fromEntries(formData.entries());
  const { success, data, error } = userAuthSchema.safeParse(valus);
  if (error) {
    toast.error("error");
  }
  if (success) {
    await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
    redirect("/auth/signin");
  }
}
