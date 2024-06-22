import { cn } from "@/lib/utils";
import SearchJobsSidebar from "@/components/shared/SearchJobsSidebar";
import JobResultsFiltered from "@/components/shared/JobResultsFiltered";
import FancyText from "@/components/shared/FancyText";
export const revalidate = 1000; // revalidate the data at most every hour

// Function to generate title based on search parameters
function getTitle({ q, type, location, remote }) {
  const titlePrefix = q
    ? `${q}`
    : type
      ? `${type} developer jobs`
      : "All Sylhet  ";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

// Home component
function Home({ searchParams }) {
  // Destructure search parameters
  const { q, type, location, page, minimum, maximum } = searchParams;

  // Generate filter values object
  const filterValues = { q, type, location, minimum, maximum };

  return (
    <div className="mx-auto my-28 max-w-5xl space-y-10 px-3">
      {/* Heading */}
      <div className="space-y-3 text-center">
        <h1
          className={cn(
            "text-4xl font-extrabold capitalize tabular-nums tracking-tight text-neutral-800 lg:text-5xl",
          )}
        >
          {getTitle(filterValues)}
          <FancyText className={"mx-4 rotate-3"}>Jobs</FancyText>
        </h1>
        <p className="">Find your dream job</p>
      </div>

      {/* Main content section */}
      <section className="flex flex-col gap-4 md:flex-row">
        {/* Search sidebar */}
        <SearchJobsSidebar defaultSearch={filterValues} />

        {/* Job results */}
        <JobResultsFiltered
          filterValue={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </div>
  );
}

export default Home;
