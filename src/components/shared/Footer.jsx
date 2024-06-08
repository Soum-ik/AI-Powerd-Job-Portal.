import Link from "next/link";

function Footer() {
  return (
    <footer className=" mx-auto my-28 max-w-5xl space-y-10 px-3">
      <section className=" flex items-center justify-between">
        <div>
          <h1 className=" text-xl font-semibold ">Sylhet Jobs</h1>
          <h1 className=" text-muted-foreground">
            Connecting talents with opportunities
          </h1>
        </div>

        <div>
          <Link className=" cursor-pointer" target="_blank" href={'https://github.com/Soum-ik/job-search-'}>Give a Star On GitHub</Link>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
