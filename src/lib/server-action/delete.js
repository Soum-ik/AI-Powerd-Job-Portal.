"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { redirect } from "next/navigation";

export async function deleteJob(slug) {
  await new Promise((resolve, reject) => {
    return setTimeout(() => {
      resolve();
    }, 500);
  });
  await prisma.job.delete({
    where: {
      slug: slug,
    },
  });
  revalidatePath(`/admin`);
  redirect("/admin");
}
