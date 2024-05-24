import { jobtype } from "@/lib/staticData";
import FancyText from "@/components/shared/FancyText";
import From from "@/components/shared/Form";
import { FaQuestionCircle } from "react-icons/fa";

function page() {
  return (
    <div className=" z-0">
      <section className="  ">
        <div className="max-w-5xl mx-auto  my-28 px-3">
          <div>
            <h1 className="text-4xl text-center font-bold mt-5 text-neutral-900">
              Create Job opportunity <FancyText>using</FancyText>
              digital platform
            </h1>

            <p className=" mt-2 text-muted-foreground text-center">
              Get your job posting seen by thousands of job seekers.
            </p>
          </div>
          <div className=" max-w-3xl mx-auto border p-3 rounded-md mt-5">
            <From jobtype={jobtype} />
          </div>
        </div>
        <div className=" ">
          <aside className=" relative  left-0 mx-10 bottom-5 ">
            <FaQuestionCircle size={26} />
          </aside>
        </div>
      </section>
    </div>
  );
}

export default page;
