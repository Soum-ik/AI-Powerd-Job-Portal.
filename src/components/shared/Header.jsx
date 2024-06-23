import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";

function Header() {
  return (
    <div className="mx-auto max-w-5xl p-3 z-50 backdrop-blur-md">
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center justify-center lg:mb-32">
          <h1
            className={cn(
              "text-center text-xl font-extrabold tabular-nums tracking-tight text-muted text-neutral-800 lg:text-7xl",
            )}
          >
            Are you looking for job?
          </h1>
          <p className="mt-2 text-center">
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
