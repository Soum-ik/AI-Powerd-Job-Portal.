import TextEditor from "@/components/shared/RichTextEditor";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobtype } from "@/lib/staticData";
import FancyText from "@/components/shared/FancyText";

function page() {
  return (
    <div className="max-w-5xl mx-auto  my-10 px-3">
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
        <form action="" className="space-y-5">
          <div>
            <h1 className=" font-semibold">Job Details</h1>
            <p className=" text-muted-foreground">
              Provide a job description and details
            </p>
          </div>
          <div>
            <label htmlFor="" className="text-medium">
              Job title
            </label>
            <Input
              className="focus:border-2 focus:border-neutral-900 "
              placeholder="e.g. Front-end Development"
              name="q"
              id="q"
            />
          </div>
          <div>
            <label htmlFor="" className="text-medium">
              Job Type
            </label>
            <Select name="location" id="location">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                {jobtype.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.placeholder}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="" className="text-medium">
              Company Name
            </label>
            <Input
              className="focus:border-2 focus:border-neutral-900 "
              placeholder="stack.lmt"
              name="q"
              id="q"
            />
          </div>
          <div>
            <label htmlFor="" className="text-medium">
              Company logo
            </label>
            <Input
              required
              className="focus:border-2 focus:border-neutral-900 "
              placeholder="e.g. Front-end Development"
              name="q"
              id="q"
              type="file"
            />
          </div>
          <div>
            <label htmlFor="" className="text-medium">
              Office location
            </label>
            <Input
              className="focus:border-2 focus:border-neutral-900 "
              placeholder="location"
              name="q"
              id="q"
            />
          </div>
          <div>
            <label htmlFor="" className="text-medium">
              Location
            </label>
            <Input
              className="focus:border-2 focus:border-neutral-900 "
              placeholder="location"
              name="q"
              id="q"
            />
          </div>
          <div>
            <label htmlFor="" className="text-medium">
              How to apply
            </label>
            <div className="  flex gap-3 items-center">
              <Input
                className="focus:border-2 focus:border-neutral-900 "
                placeholder="Email"
                name="q"
                id="q"
              />
              Or
              <Input
                className="focus:border-2 focus:border-neutral-900 "
                placeholder="Email"
                name="q"
                id="q"
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-medium">
              Description
            </label>
            <TextEditor />
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
