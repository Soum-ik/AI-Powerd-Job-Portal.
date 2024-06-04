"use server";

import prisma from "../prisma";

// for admin checking all of
export async function Unapproved() {
  const Unapproved = await prisma.job.findMany({
    where: {
      approved: false,
    },
    orderBy: { createdAt: "desc" },
  });
  return Unapproved;
}

// for recuiter to checking jobs unapproved
export async function ReUnapproved(id) {
  const Unapproved = await prisma.job.findMany({
    where: {
      approved: false,
      userId: id,
    },
    orderBy: { createdAt: "desc" },
  });
  return Unapproved;
}

// for recuiter to checking jobs approved
export async function ReApproved(id) {
  const approved = await prisma.job.findMany({
    where: {
      approved: true,
      userId: id,
    },
    orderBy: { createdAt: "desc" },
  });
  return approved;
}
