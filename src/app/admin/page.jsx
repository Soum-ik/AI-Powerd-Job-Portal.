import JobListItem from "@/components/shared/jobList";
import FancyText from "@/components/shared/FancyText";
import Link from "next/link";

import { Unapproved } from "@/lib/server-action/unapproved";

async function page() {
  // Fetch unapproved jobs after the delay
  const UnapprovedJobs = await Unapproved();

  return (
    <div className="mx-auto  my-24 max-w-5xl px-3">
      <h1 className="text-4xl text-center font-bold mt-5 text-neutral-900">
        Admin <FancyText className={"mr-0 p-0 rotate-1"}>Dash</FancyText>board
      </h1>
      <h2 className=" my-4 mt-10 text-lg font-semibold">Unapproved Jobs:</h2>
      <div className=" grow space-y-4">
        {UnapprovedJobs?.map((job) => (
          <Link key={job.id} href={`admin/jobs/${job.slug}`} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
        {UnapprovedJobs?.length === 0 && <p className=" text-center md:mt-20">Unapproved Jobs Not Found.</p>}
      </div>
    </div>
  );
}

export default page;
