import Image from "next/image";
import Link from "next/link";
import ServerProfileView from "@/components/shared/profile/ServerProfileView";

async function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 shadow-sm backdrop-blur-sm">
      <nav className="mx-auto my-3 max-w-5xl px-3">
        <section className="flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={"/images/company-logo-placeholder.png"}
              alt="company-logo-placeholder"
              width={60}
              height={20}
            />
          </Link>
          <div className="flex gap-2">
            <Link href={"/jobs/new"}>
              <button className="cursor-pointer rounded-md border bg-neutral-800 px-3 py-1 text-lg font-medium text-white">
                Post Job
              </button>
            </Link>
            <ServerProfileView />
          </div>
        </section>
      </nav>
    </div>
  );
}

export default Navbar;
