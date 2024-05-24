import SingelJob from "@/components/shared/SingelJob";
import prisma from "@/lib/prisma";
import { FindQuine } from "@/lib/server-action/find-quine";
import React from "react";

export default async function page({ params }) {
  const { title } = params;
  const { job } = await FindQuine(title);

  return (
    <div className="mx-auto my-5 max-w-5xl px-3">
      <h1 className=" text-4xl text-center font-bold mb-5 underline underline-offset-4 ">
        Admin Approval
      </h1>
      <div className=" flex items-center justify-between">
        <SingelJob job={job} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
    select: {
      slug: true,
    },
  });

  return jobs.map((item) => item.slug);
}
