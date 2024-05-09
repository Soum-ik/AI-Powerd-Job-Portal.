import { cn } from "@/lib/utils";
import SearchJobsSidebar from "@/components/shared/SearchJobsSidebar";
import JobResultsFiltered from "@/components/shared/JobResultsFiltered";

// for heading...
function getTitle({ q, type, location, remote }) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
    ? `${type} developer jobs`
    : remote
    ? "Remote developer jobs"
    : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

async function Home({ searchParams }) {
  // search from url
  const { q, type, location, page } = searchParams;
  // search from url
  const filterValues = { q, type, location };

  return (
    <div className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className=" space-y-3 text-center">
        <h1
          className={cn("text-4xl   font-extrabold tracking-tight lg:text-5xl")}
        >
          {getTitle(filterValues)}
        </h1>
        <p className=" ">Find your dream job</p>
      </div>

      <section className=" flex flex-col md:flex-row gap-4">
        <SearchJobsSidebar defaultSearch={filterValues} />

        <JobResultsFiltered
          filterValue={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </div>
  );
}

export default Home;
