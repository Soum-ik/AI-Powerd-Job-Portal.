import JobListItem from "@/components/shared/jobList";
import FancyText from "@/components/shared/FancyText";
import Link from "next/link";
import React from "react";
import { Unapproved } from "@/lib/server-action/unapproved";
async function page() {
  const UnapprovedJobs = await Unapproved();
  return (
    <div className="mx-auto my-10 max-w-5xl px-3">
      <h1 className="text-4xl text-center font-bold mt-5 text-neutral-900">
        Admin <FancyText className={"mr-0 p-0 rotate-1"}>Dash</FancyText>board
      </h1>
      <h2 className=" my-4 text-lg font-semibold">Unapproved Jobs:</h2>
      <div className=" grow space-y-4">
        {UnapprovedJobs?.map((job) => (
          <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
