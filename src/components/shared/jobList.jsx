import Image from "next/image";
// import compmanyLogoPlaceHolder from "../../../public/company-logo-placeholder.png";
import { Badge } from "@/components/ui/badge";
import { BiBriefcase, BiMapPin } from "react-icons/bi";
import { ClockIcon } from "@radix-ui/react-icons";
import { BsGlobe2 } from "react-icons/bs";
import { GiBanknote } from "react-icons/gi";
import { formatMoney, relativeDate } from "@/lib/utils";

function JobList({ job }) {
  return (
    <article className="flex gap-3 rounded-lg border p-5  transition-all duration-300 hover:bg-muted/60 ">
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
          <p className="flex items-center gap-1.5 sm:hidden">
            <BiBriefcase size={16} className="shrink-0" />
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
          <p className="flex items-center gap-1.5 sm:hidden">
            <ClockIcon size={16} className="shrink-0" />
            {relativeDate(job.createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden  shrink-0 flex-col items-end justify-between sm:flex">
        <Badge className="bg-neutral-800 py-1">{job.type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <ClockIcon size={16} />
          {relativeDate(job.createdAt)}
        </span>
      </div>
    </article>
  );
}

export default JobList;
