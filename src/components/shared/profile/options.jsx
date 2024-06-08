"use server";
import Link from "next/link";
import { deleteCookie } from "@/lib/Next-auth/RoleChecker";
import { BiLogOut, BiSolidUserAccount, BiLogIn } from "react-icons/bi";

    async function Options() {
  const cookie = false;
  return (
    <div className="mr-32 min-w-max cursor-pointer space-y-2 rounded-lg bg-white p-4 shadow backdrop-blur-md">
      <Link
        href={"/recuters"}
        className="flex border-spacing-11 items-center gap-2 border-b"
      >
        <BiSolidUserAccount /> Recuter Account
      </Link>
      {cookie ? (
        <Link href={"/auth/login"} className="flex items-center gap-2">
          <BiLogIn />
          Log In
        </Link>
      ) : (
        <h1 className="flex items-center gap-2" onClick={() => deleteCookie()}>
          <BiLogOut />
          Log out
        </h1>
      )}
    </div>
  );
}

export default Options;
