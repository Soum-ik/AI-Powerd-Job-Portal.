import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";

function Header() {
  return (
    <div className="mx-auto max-w-5xl p-3 z-50 backdrop-blur-md">
      <div className="flex min-h-[60vh] md:min-h-[80vh] items-center justify-center">
        <div className="flex flex-col lg:items-center justify-center  mb-24 lg:mb-32">
          <h1
            className={cn(
              "md:text-center font-extrabold tabular-nums tracking-tight text-muted text-neutral-800  text-6xl lg:text-7xl",
            )}
          >
            Are you looking for job?
          </h1>
          <p className="mt-5 md:mt-2 md:text-center">
            Here is the best platform to find job
          </p>
          <Link href={"/auth/login"}>
            <Badge className="mt-3 cursor-pointer px-3 py-2 text-center">
              Join Now
            </Badge>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
