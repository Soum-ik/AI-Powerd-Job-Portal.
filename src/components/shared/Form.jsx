"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import toast, { Toaster } from "react-hot-toast";

function Form({ jobtype }) {
  const [description, setDescription] = useState("");
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  const [loading, setloading] = useState(false);

  const [type, setType] = useState("");
  const [form, setForm] = useState([
    {
      title: "",
      companyName: "",
      officeLocation: "",
      location: "",
      applicationUrl: "",
      applicationEmail: "",
      salary: 0,
    },
  ]);

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
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `
  
            `,
            styles: {
              bold: false,
            },
          },
        ],
      },
    ],
  });
  const onChange = async () => {
    const updatedMarkdown = await editor.blocksToMarkdownLossy(editor.document);
    setDescription(updatedMarkdown);
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

  const formData = {
    salary,
    type,
    description,
    companyLogoUrl,
    title,
    companyName,
    officeLocation,
    location,
    applicationUrl,
    applicationEmail,
  };

  async function handleClick(e) {
    e.preventDefault();
    try {
      setloading(true);
      const api = await fetch("/api/job", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const result = await api.json();
      if (result.status === 201) {
        toast.success("Job Post Successfully");
        setForm({
          title: "",
          companyName: "",
          officeLocation: "",
          location: "",
          applicationUrl: "",
          applicationEmail: "",
          salary: 0,
        });
        setDescription("");
        setloading(false);
      } else {
        toast.error("Job Post Unsuccessfull")
      }
    } catch (error) {
      console.log(error, "Error");
      setloading(false);
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
          <label htmlFor="" className="text-medium">
            Job title
          </label>
          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="e.g. Front-end Development"
            name="title"
            value={title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            id="q"
          />
        </div>
        <div>
          <label htmlFor="" className="text-medium">
            Job Type
          </label>
          <Select
            value={type}
            onValueChange={(newValue) => setType(newValue)}
            defaultValue="All Types"
            required
            name="location"
            id="location"
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
          <label htmlFor="" className="text-medium">
            Company Name
          </label>
          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="stack.lmt"
            name="companyName"
            onChange={(e) => handleFormChange("companyName", e.target.value)}
            value={companyName}
            id="companyName"
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
            name="image"
            onChange={handleFileChange}
            id="image"
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
            name="officeLocation"
            value={officeLocation}
            onChange={(e) => handleFormChange("officeLocation", e.target.value)}
            id="location"
          />
        </div>
        <div>
          <label htmlFor="" className="text-medium">
            Location
          </label>
          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="location"
            name="location"
            value={location}
            onChange={(e) => handleFormChange("location", e.target.value)}
            id="location"
          />
        </div>
        <div>
          <label htmlFor="" className="text-medium">
            How to apply
          </label>
          <div className="  flex gap-3 items-center">
            <Input
              className="focus:border-2 focus:border-neutral-900 "
              placeholder="email"
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
              value={applicationUrl}
              onChange={(e) =>
                handleFormChange("applicationUrl", e.target.value)
              }
              id="applicationUrl"
            />
          </div>
        </div>

        <div>
          <label htmlFor="" className="text-medium">
            Description
          </label>

          <div className="border rounded-md py-2 min-h-40">
            <BlockNoteView editor={editor} onChange={onChange} />
          </div>
        </div>
        <div>
          <label htmlFor="" className="text-medium">
            Salary
          </label>

          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="Salary"
            name="salary"
            type="number"
            value={salary}
            onChange={(e) => handleFormChange("salary", e.target.value)}
            id="salary"
          />
        </div>
        <button
          type="submit"
          onClick={handleClick}
          disabled={loading}
          className={`bg-neutral-800  text-neutral-100 gap-2 flex items-center justify-center rounded-md px-3 py-1 disabled:bg-neutral-700`}
        >
          {loading ? (
            <>
              <div className="animate-spin border-b border-2 rounded-full border-neutral-100 size-6 bg-neutral-800"></div>
              <p>{`Processing...`} </p>
            </>
          ) : (
            <p>Submit</p>
          )}
        </button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default Form;
