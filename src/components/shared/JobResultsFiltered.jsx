"use server";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import JobListItem from "@/components/shared/jobList";
import { cn } from "@/lib/utils";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

// prisma client check
const prisma = new PrismaClient();

export default async function JobResults({ filterValue, page = 1 }) {
  const jobsPerPage = 10;
  const skip = (page - 1) * jobsPerPage;
  let { q, type, location, minimum, maximum } = filterValue;

  const smallDigit = parseInt(minimum);
  const bigDigit = parseInt(maximum);

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
          // {
          //   salary: {
          //     gt: smallDigit,
          //     lt: bigDigit,
          //   },
          // },
          // { locationType: { contains: searchString, mode: "insensitive" } },
        ],
      }
    : {};

  // Construct the 'where' object with conditional filters
  const where = {
    AND: [
      searchFilter, // Include searchFilter if searchString is provided
      type ? { type } : {}, // Include type filter if type is provided
      location ? { location } : {}, // Include location filter if location is provided
      maximum !== undefined ? { salary: { lte: Number(bigDigit) } } : {}, // Include maximum salary filter if provided
      minimum !== undefined ? { salary: { gte: Number(smallDigit) } } : {}, // Include minimum salary filter if provided
      { approved: true },
    ],
  };

  // Fetch jobs based on the constructed 'where' object
  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  // Count total jobs are avaiable
  const countPromise = prisma.job.count({ where });

  // Await the resolution of the jobsPromise
  const [jobs, totalPages] = await Promise.all([jobsPromise, countPromise]);
  // Return or use 'jobs' data as needed
  console.log(jobs.length, "checking");

  return (
    <div className="grow space-y-4">
      {jobs?.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalPages / jobsPerPage)}
          filterValue={filterValue}
        />
      )}
    </div>
  );
}

function Pagination({ currentPage, totalPages, filterValue }) {
  const { q, type, location } = filterValue;

  // generatePageLink
  function generatePageLink(page) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <BsArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <BsArrowRight size={16} />
      </Link>
    </div>
  );
}
