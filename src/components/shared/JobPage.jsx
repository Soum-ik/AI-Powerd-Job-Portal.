import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";
import { BiBriefcase } from "react-icons/bi";
import { BsGlobe2 } from "react-icons/bs";
import { GiBanknote } from "react-icons/gi";

export default function JobPage({ job }) {
  const {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    // locationType,
    location,
    salary,
    companyLogoUrl,
  } = job;

  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={applicationUrl}
                  className="text-green-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <BiBriefcase size={16} className="shrink-0" />
              {type}
            </p>
            {/* <p className="flex items-center gap-1.5">
              <BiMapPin size={16} className="shrink-0" />
              {locationType}
            </p> */}
            <p className="flex items-center gap-1.5">
              <BsGlobe2 size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <GiBanknote size={16} className="shrink-0" />
              {salary}
            </p>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
}
