import prisma from "../prisma";

export async function Unapproved() {
  const Unapproved = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });
  return Unapproved;
}
