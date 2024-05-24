"use client";
import Button from "./button";
import Image from "next/image";
import { ClockIcon } from "@radix-ui/react-icons";
import { BsGlobe2 } from "react-icons/bs";
import { GiBanknote } from "react-icons/gi";
import { formatMoney, relativeDate } from "@/lib/utils";
import { approved } from "@/lib/server-action/approved";

function SingelJob({ job }) {
  console.log(job.slug, "update this job");
  return (
    <article className="flex gap-3 w-full  justify-between rounded-lg border p-5  transition-all duration-300 hover:bg-muted/60">
      <Image
        alt={`${job.companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
        src={job.companyLogoUrl || "/images/company-logo-placeholder.png"}
      />
      <div className=" flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{job.title}</h2>
          <p className="text-muted-foreground">{job.companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 ">
            {/* <BiBriefcase size={16} className="shrink-0" /> */}
            {job.type}
          </p>
          <p className="flex items-center gap-1.5">
            <BsGlobe2 size={16} className="shrink-0" />
            {job.location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <GiBanknote size={16} className="shrink-0" />
            {formatMoney(job.salary)}
          </p>
          <p className="flex items-center gap-1.5 ">
            <ClockIcon size={16} className="shrink-0" />
            {relativeDate(job.createdAt)}
          </p>
        </div>
      </div>
      <div className=" flex-grow max-w-max space-y-1 flex  flex-col">
        <Button
          fun={() => approved(job.slug)}
          className={
            " font-medium text-lg cursor-pointer border rounded-md px-3 py-2 bg-neutral-800/90 text-white"
          }
        >
          Approve Job
        </Button>
      </div>
    </article>
  );
}

export default SingelJob;
