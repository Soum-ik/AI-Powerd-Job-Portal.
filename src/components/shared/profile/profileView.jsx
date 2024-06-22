// src/components/ProfileView.js
"use client";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { deleteCookie } from "@/lib/Next-auth/RoleChecker";
import { BiLogOut, BiSolidUserAccount, BiLogIn } from "react-icons/bi";
function ProfileView() {
  const [open, setOpen] = useState(false);
  let cookie;
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
                className="flex border-spacing-11 items-center gap-2 border-b"
              >
                <BiSolidUserAccount /> Recuter Account
              </Link>
              <Link
                href={"/admin"}
                className="flex border-spacing-11 items-center gap-2 border-b"
              >
                <BiSolidUserAccount /> Admin Account
              </Link>
              {cookie ? (
                <Link href={"/auth/login"} className="flex items-center gap-2">
                  <BiLogIn />
                  Log In
                </Link>
              ) : (
                <h1
                  className="flex items-center gap-2"
                  onClick={() => deleteCookie()}
                >
                  <BiLogOut />
                  Log out
                </h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
