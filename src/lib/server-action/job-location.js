import { PrismaClient } from "@prisma/client";

export async function jobLocations() {
  const prisma = new PrismaClient();

  try {
    const locations = await prisma.job.findMany({
      where: {
        approved: true,
      },
      select: {
        location: true,
      },
    });
    return locations;
  } catch (error) {
    console.log("Error creating a database connection:", error);
  }
}
