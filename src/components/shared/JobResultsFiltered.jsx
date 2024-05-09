import prisma from "@/lib/prisma";
import Link from "next/link";
import JobListItem from "@/components/shared/jobList";

export default async function JobResults({ filterValue, page = 1 }) {
  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;
  const { q, type, location } = filterValue;

  // Ensure searchString is properly initialized
  const searchString = q
    ? q
        .split(" ")
        .filter((word) => word.length > 0)
        .join(" & ")
    : "";

  // Create a searchFilter based on searchString
  const searchFilter = searchString
    ? {
        OR: [
          { title: { contains: searchString, mode: "insensitive" } },
          { companyName: { contains: searchString, mode: "insensitive" } },
          { type: { contains: searchString, mode: "insensitive" } },
          { location: { contains: searchString, mode: "insensitive" } },
          { locationType: { contains: searchString, mode: "insensitive" } },
        ],
      }
    : {};

  // Construct the 'where' object with conditional filters
  const where = {
    AND: [
      searchFilter, // Include searchFilter if searchString is provided
      type ? { type } : {}, // Include type filter if type is provided
      location ? { location } : {}, // Include location filter if location is provided
      { approved: true }, // Always include approved filter
    ],
  };

  // Fetch jobs based on the constructed 'where' object
  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  // Await the resolution of the jobsPromise
  const [jobs] = await Promise.all([jobsPromise]);

  // Return or use 'jobs' data as needed

  return (
    <div className=" grow space-y-4">
      {jobs?.map((job, index) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobs.length > 0 && <Pagination />}
    </div>
  );
}

function Pagination({}) {
  return (
    <div className=" flex justify-between">
      <h1 className=" text-center">Page</h1>
    </div>
  );
}
