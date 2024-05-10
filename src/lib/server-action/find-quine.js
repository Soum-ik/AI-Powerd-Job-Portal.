import prisma from "../prisma";

export async function FindQuine(slug) {
  const job = await prisma.job.findUnique({
    where: {
      slug: slug.toString(),
    },
  });
  return { job };
}
