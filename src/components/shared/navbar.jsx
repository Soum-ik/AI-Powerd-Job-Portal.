import Image from "next/image";
import Button from "./button";
import Link from "next/link";

function Navbar() {
  return (
    <p>
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
            <Button className=" font-medium text-lg cursor-pointer border rounded-md px-3 py-2 bg-gray-800 text-white ">
              Post Job
            </Button>
          </section>
        </nav>
      </div>
    </p>
  );
}

export default Navbar;
