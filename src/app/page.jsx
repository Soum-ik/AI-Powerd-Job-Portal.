import { cn } from "@/lib/utils";
import SearchJobsSidebar from "@/components/shared/SearchJobsSidebar";
import JobResultsFiltered from "@/components/shared/JobResultsFiltered";
import FancyText from "@/components/shared/FancyText";

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
  const { q, type, location, page } = searchParams;

  // Generate filter values object
  const filterValues = { q, type, location };

  return (
    <div className="mx-auto my-28 max-w-5xl space-y-10 px-3">
      {/* Heading */}
      <div className=" space-y-3 text-center">
        <h1
          className={cn(
            "text-4xl font-extrabold tracking-tight lg:text-5xl text-neutral-800 capitalize tabular-nums"
          )}
        >
          {getTitle(filterValues)}
          <FancyText className={"rotate-3 mx-4"}>Jobs</FancyText>
        </h1>
        <p className="">Find your dream job</p>
      </div>

      {/* Main content section */}
      <section className="flex flex-col md:flex-row gap-4">
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
