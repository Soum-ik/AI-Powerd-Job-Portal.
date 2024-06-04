"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import RichTextEditor from "@/components/shared/RichTextEditor";

function Form({ jobtype }) {
  const router = useRouter();
  const editorRef = useRef(null);  

  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("");
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    officeLocation: "",
    location: "",
    applicationUrl: "",
    applicationEmail: "",
    salary: 0,
  });

  const handleFormChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
      const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

      try {
        toast.loading("Image Uploading..", { duration: 2000 });

        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const { data } = await response.json();
          setCompanyLogoUrl(data.display_url);
          toast.success("Image Uploaded Successfully");
        } else {
          toast.error("Your Image are not uploaded");
        }
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  const {
    title,
    companyName,
    officeLocation,
    location,
    applicationUrl,
    applicationEmail,
    salary,
  } = form;

  async function handleClick(e) {
    e.preventDefault();
    if (!editorRef || !type || !companyLogoUrl) {
      toast.error("Field are not filled!");
      return;
    }
    try {
      setLoading(true);
      const editorContent = editorRef.current.getEditorContent();
     
      const finalFormData = {
        ...form,
        description: editorContent,
        type,
        companyLogoUrl,
      };

      const api = await fetch("/api/job", {
        method: "POST",
        body: JSON.stringify(finalFormData),
      });
      const result = await api.json();
      if (result.status === 201) {
        setLoading(false);
        toast.success("Job Post Successfully");
        router.replace("/job-submitted");
      } else {
        setLoading(false);
        toast.error("Job Post Unsuccessful");
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "Error");
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="space-y-5">
        <div>
          <h1 className=" font-semibold">Job Details</h1>
          <p className=" text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <div>
          <label htmlFor="title" className="text-medium">
            Job title
          </label>
          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="e.g. Front-end Development"
            name="title"
            value={title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            id="title"
            required
          />
        </div>
        <div>
          <label htmlFor="job-type" className="text-medium">
            Job Type
          </label>
          <Select
            value={type}
            onValueChange={(newValue) => setType(newValue)}
            defaultValue="All Types"
            required
            name="job-type"
            id="job-type"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
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
          <label htmlFor="companyName" className="text-medium">
            Company Name
          </label>
          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="stack.lmt"
            name="companyName"
            onChange={(e) => handleFormChange("companyName", e.target.value)}
            value={companyName}
            id="companyName"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="text-medium">
            Company logo
          </label>
          <Input
            required
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="e.g. Front-end Development"
            name="image"
            onChange={handleFileChange}
            id="image"
            type="file"
          />
        </div>
        <div>
          <label htmlFor="officeLocation" className="text-medium">
            Office location
          </label>
          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="location"
            name="officeLocation"
            value={officeLocation}
            onChange={(e) => handleFormChange("officeLocation", e.target.value)}
            id="officeLocation"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="text-medium">
            Location
          </label>
          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="location"
            name="location"
            required
            value={location}
            onChange={(e) => handleFormChange("location", e.target.value)}
            id="location"
          />
        </div>
        <div>
          <label htmlFor="applicationEmail" className="text-medium">
            How to apply
          </label>
          <div className="flex gap-3 items-center">
            <Input
              className="focus:border-2 focus:border-neutral-900 "
              placeholder="email"
              required
              value={applicationEmail}
              onChange={(e) =>
                handleFormChange("applicationEmail", e.target.value)
              }
              name="applicationEmail"
              id="applicationEmail"
            />
            Or
            <Input
              className="focus:border-2 focus:border-neutral-900 "
              placeholder="applicationUrl"
              name="applicationUrl"
              required
              value={applicationUrl}
              onChange={(e) =>
                handleFormChange("applicationUrl", e.target.value)
              }
              id="applicationUrl"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="text-medium">
            Description
          </label>
          <div className="border rounded-md py-2 min-h-40">
            <RichTextEditor ref={editorRef} />
          </div>
        </div>
        <div>
          <label htmlFor="salary" className="text-medium">
            Salary
          </label>
          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="Salary"
            name="salary"
            type="number"
            required
            value={salary}
            onChange={(e) => handleFormChange("salary", e.target.value)}
            id="salary"
          />
        </div>
        <button
          type="submit"
          onClick={handleClick}
          disabled={loading}
          className={`bg-neutral-800 text-neutral-100 gap-2 flex items-center justify-center rounded-md px-3 py-1 disabled:bg-neutral-700`}
        >
          {loading ? (
            <>
              <div className="animate-spin border-b border-2 rounded-full border-neutral-100 size-6 bg-neutral-800"></div>
              <p>{`Processing...`}</p>
            </>
          ) : (
            <p>Submit</p>
          )}
        </button>
      </form>
      <Toaster position="top-center" />
    </div>
  );
}

export default Form;
