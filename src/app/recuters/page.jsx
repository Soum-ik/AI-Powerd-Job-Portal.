import Image from "next/image";
import prisma from "@/lib/prisma";
import JobList from "@/components/shared/jobList";
import { ReApproved, ReUnapproved } from "@/lib/server-action/unapproved";
import { RoleChecker } from "@/lib/Next-auth/RoleChecker";

async function page() {
  // get the value from cookie
  const {
    profile: { id },
  } = await RoleChecker();

  // get the id from cookie and find profile by cookie data
  const profile = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  // filtering Unapproved by id
  const unapproved = await ReUnapproved(id);
  // filtering approved by id
  const approved = await ReApproved(id);
 
  // log
  return (
    <div className="mx-auto max-w-5xl p-3 sm:p-0 my-28" >
      <div className="flex justify-between">
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
            {profile.name || `Soumik Sarkar`}
          </h1>
          <h1 className="text-sm">{profile.email || `info@gmail.com`}</h1>
          <h1 className="text-sm">Role: {profile.role || `User`}</h1>
        </div>
      </div>
      <div className="mt-20">
        <h1 className="mx-auto max-w-sm border-spacing-7 border-b text-center text-2xl font-semibold capitalize md:text-3xl">
          All Posted Jobs{" "}
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:px-5">
          <div className="max-w-xl">
            <h1 className="md:text-lg text-sm ">Approved Jobs:</h1>
            <div className="mt-3">
              {approved.map((data, idx) => (
                <JobList job={data} key={idx} />
              ))}
            </div>
            {approved.length <= 0 && (
              <p className="mt-2 text-xs md:mt-5">No job are posted</p>
            )}
          </div>
          <div className="max-w-xl">
            <h1 className="md:text-lg text-sm ">Unapproved Jobs:</h1>
            <div className="mt-3">
              {unapproved.map((data, idx) => (
                <JobList job={data} key={idx} />
              ))}
            </div>
            {unapproved.length <= 0 && (
              <p className="mt-2 text-xs md:mt-5">No job are posted</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
