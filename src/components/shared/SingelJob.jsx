"use client";
import Image from "next/image";
import { ClockIcon } from "@radix-ui/react-icons";
import { BsGlobe2 } from "react-icons/bs";
import { GiBanknote } from "react-icons/gi";
import { formatMoney, relativeDate } from "@/lib/utils";
import { approved } from "@/lib/server-action/approved";
import { deleteJob } from "@/lib/server-action/delete";
import { FindQuine } from "@/lib/server-action/find-quine";

function SingelJob({ job }) {
  const handleClick = async (slug, operation) => {
    switch (operation) {
      case "approved":
        return await approved(slug);
      case "delete":
        return await deleteJob(slug);
      case "show":
        return await FindQuine(slug);
    }
  };

  return (
    <article className="flex w-full justify-between gap-3 rounded-lg border p-5 transition-all duration-300 hover:bg-muted/60">
      <Image
        alt={`${job.companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
        src={job.companyLogoUrl || "/images/company-logo-placeholder.png"}
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{job.title}</h2>
          <p className="text-muted-foreground">{job.companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5">
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
          <p className="flex items-center gap-1.5">
            <ClockIcon size={16} className="shrink-0" />
            {relativeDate(job.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex max-w-max flex-grow flex-col space-y-1">
        <button
          onClick={() => handleClick(job.slug, "approved")}
          className="button"
        >
          Approved Job
        </button>
        <button
          onClick={() => handleClick(job.slug, "delete")}
          className="button"
        >
          Delete Job
        </button>
        <button
          onClick={() => handleClick(job.slug, "show")}
          className="button"
        >
          Show Job
        </button>
      </div>
    </article>
  );
}

export default SingelJob;
