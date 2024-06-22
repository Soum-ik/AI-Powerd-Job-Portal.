"use server";
import { redirect } from "next/navigation";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function approved(slug) {
  await prisma.job.update({
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
  slug = slug.split("-").slice(0, 1);
  const searchParams = new URLSearchParams({
    ...{ q: slug },
  });
  revalidatePath('/admin');
  revalidatePath('/');
  redirect('/');
}
