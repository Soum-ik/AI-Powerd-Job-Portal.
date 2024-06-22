import JobListItem from "@/components/shared/jobList";
import FancyText from "@/components/shared/FancyText";
import Link from "next/link";

import { Unapproved, approved } from "@/lib/server-action/unapproved";
import { RoleChecker } from "@/lib/Next-auth/RoleChecker";
import prisma from "@/lib/prisma";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
export const revalidate = 1000; // revalidate the data at most every hour
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function page() {
  // Fetch unapproved jobs after the delay

  const { id } = await RoleChecker();

  // get the id from cookie and find profile by cookie data
  const profile = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  console.log(profile, "checkig ");

  const UnapprovedJobs = await Unapproved();
  const approvedJobs = await approved();

  return (
    <div className="mx-auto my-24 max-w-5xl px-3">
      <h1 className="mt-5 text-center text-4xl font-bold text-neutral-900">
        Admin <FancyText className={"mr-0 rotate-1 p-0"}>Dash</FancyText>board
      </h1>
      <div className="my-10 flex justify-between">
        <div className="relative rounded-full">
          <Image
            alt="profile image"
            className="size-20 rounded-full object-contain mix-blend-multiply md:size-32"
            src={profile.image || `/images/profile.png`}
            width={100}
            height={400}
          />
          <span className="absolute right-3 top-0 size-3 animate-pulse rounded-full bg-green-600 duration-1000 ease-in-out md:size-5"></span>
        </div>
        <div className="space-y-1 text-right">
          <h1 className="mt-5 text-xl font-bold text-neutral-900 md:text-2xl">
            {profile.name || `Admin`}
          </h1>
          <h1 className="text-sm">{profile.email || `info@gmail.com`}</h1>
          <h1 className="text-sm">Role: {profile.role || `ADMIN`}</h1>
        </div>
      </div>

      <Tabs defaultValue="Unapproved" className="">
        <TabsList>
          <TabsTrigger value="Unapproved">Unapproved Jobs</TabsTrigger>
          <TabsTrigger value="Approved">Approved Jpbs</TabsTrigger>
        </TabsList>
        <TabsContent value="Unapproved">
          <div className="grow space-y-4">
            {UnapprovedJobs?.map((job) => (
              <Link
                key={job.id}
                href={`admin/jobs/${job.slug}`}
                className="block"
              >
                <JobListItem job={job} />
              </Link>
            ))}
            {UnapprovedJobs?.length === 0 && (
              <p className="text-center md:mt-20">Unapproved Jobs Not Found.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="Approved">
          <div className="grow space-y-4">
            {approvedJobs?.map((job) => (
              <Link
                key={job.id}
                href={`admin/jobs/${job.slug}`}
                className="block"
              >
                <JobListItem job={job} />
              </Link>
            ))}
            {approvedJobs?.length === 0 && (
              <p className="text-center md:mt-20">App Jobs Not Found.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <Toaster position="top-center" />
    </div>
  );
}

export default page;
