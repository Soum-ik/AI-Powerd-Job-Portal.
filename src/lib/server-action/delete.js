"use server";

import prisma from "../prisma";

export async function approved(slug) {
  const deleteData = await prisma.job.delete({
    where: {
      slug: slug,
    },
  });

  return deleteData;
}
