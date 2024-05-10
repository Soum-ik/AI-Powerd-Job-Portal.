"use server"
import prisma from "@/lib/prisma";
import { FindQuine } from "@/lib/server-action/find-quine";
import JobPage from "@/components/shared/JobPage";
import Button from "@/components/shared/button";

async function page({ params }) {
  const { slug } = params;
  const { job } = await FindQuine(slug);

  // Function to handle clicking on the Apply button
  const handleApplyClick = () => {
    "use server"
    // Construct the mailto link with pre-filled email subject
    const mailtoLink = `mailto:${job.applicationEmail}?subject=Job Application: ${job.title}`;
    // Open the default email client
    window.location.href = mailtoLink;
  };

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button handleApplyClick={handleApplyClick} className={" border min-w-max px-3 py-2 rounded-md bg-neutral-900 text-white font-medium"}>Apply Now</Button>
      </aside>
    </main>
  );
}

export default page;

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: {
      slug: true,
    },
  });

  return jobs.map((item) => item.slug);
}
