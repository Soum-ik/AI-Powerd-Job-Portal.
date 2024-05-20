import Image from "next/image";
import Button from "./button";
import Link from "next/link";

function Navbar() {
  return (
    <div className=" border-b shadow-sm">
      <nav className="mx-auto  max-w-5xl my-3 px-3">
        <section className=" flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={"/images/company-logo-placeholder.png"}
              alt="company-logo-placeholder"
              width={60}
              height={20}
            />
          </Link>
          <Link href={"/jobs/new"}>
            <button className=" font-medium text-lg cursor-pointer border rounded-md px-3 py-2 bg-neutral-800 text-white ">
              Post Job
            </button>
          </Link>
        </section>
      </nav>
    </div>
  );
}

export default Navbar;
