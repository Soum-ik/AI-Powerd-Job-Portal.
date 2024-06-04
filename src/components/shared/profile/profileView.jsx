// src/components/ProfileView.js
"use client";

import { deleteCookie } from "@/lib/Next-auth/RoleChecker";
import Link from "next/link";
import React, { useState } from "react";
import { BiLogOut, BiSolidUserAccount } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

function ProfileView({ profile }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="relative" onClick={() => setOpen(!open)}>
        <button className="flex items-center justify-center">
          <CgProfile size={30} />
        </button>
        {/* {profile && (
        )} */}
        <div className="absolute -left-28 top-10 z-50 p-2">
          {open && (
            <div className="mr-32 min-w-max cursor-pointer space-y-2 rounded-lg bg-white p-4 shadow backdrop-blur-md">
              <Link
                href={"/recuters"}
                className="flex border-spacing-11 items-center  gap-2 border-b"
              >
                <BiSolidUserAccount /> My Account
              </Link>
              <h1 className="flex gap-2  items-center" onClick={() => deleteCookie()}>
                <BiLogOut />
                Log out
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
