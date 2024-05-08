import prisma from "@/lib/prisma";
import JobList from "@/components/shared/jobList";

async function page() {
  // GET DATA FROM DATABASE
  const jobs = await prisma.job.findMany();

  return (
    <div className=" max-w-5xl mx-auto px-5 my-10">
      <div className=" space-y-3">
        {/* JOBS LIST */}
        {jobs?.map((job, index) => (
          <JobList job={job} key={index} />
        ))}
      </div>
    </div>
  );
}

export default page;
