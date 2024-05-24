"use server";

import { redirect } from "next/navigation";
import prisma from "../prisma";

export async function approved(slug) {
  const approved = await prisma.job.update({
    where: {
      slug: slug,
    },

    data: {
      approved: true,
    },
    select: {
      approved: true,
    },
  });

  redirect('/admin')
  return approved;
}
