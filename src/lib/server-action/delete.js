"use server";

import { redirect } from "next/navigation";
import prisma from "../prisma";

export async function deleteJob(slug) {
  await new Promise((resolve, reject) => {
    return setTimeout(() => {
      resolve();
    }, 1000);
  });
  await prisma.job.delete({
    where: {
      slug: slug,
    },
  });
  redirect(`/admin`);
}
