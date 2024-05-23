import prisma from "../prisma";

export async function jobLocations() {
  const locations = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      location: true,
    },
  }); 
  return locations;
}
