"use server";

import prisma from "../prisma";

// to showcase on admin page all of Unapproved page
export async function Unapproved() {
  const Unapproved = await prisma.job.findMany({
    where: {
      approved: false,
    },
    orderBy: { createdAt: "desc" },
  });
  return Unapproved;
}

// to showcase on admin page all of approved page
export async function approved() {
  const approved = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return approved;
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
