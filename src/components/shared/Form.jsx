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
import { submitForm } from "@/lib/actions";
import { useCreateBlockNote } from "@blocknote/react";

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
      salary: "",
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
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const { data } = await response.json();
          setCompanyLogoUrl(data.display_url);
        } else {
          console.log("Failed to upload image");
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
    website,
    applicationEmail,
    Selary,
  } = form;
  console.table(form);

  const formData = { type, description, companyLogoUrl, ...form };
  console.table(formData);

  function handleClick(e) {
    e.preventDefault();
    console.table();
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
            required
            name="location"
            id="location"
          >
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
              placeholder="Website"
              name="Website"
              value={website}
              onChange={(e) => handleFormChange("website", e.target.value)}
              id="Website"
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
            Selary
          </label>

          <Input
            className="focus:border-2 focus:border-neutral-900 "
            placeholder="Selary"
            name="Selary"
            type="number"
            value={Selary}
            onChange={(e) => handleFormChange("Selary", e.target.value)}
            id="Selary"
          />
        </div>
        <button
          type="submit"
          onClick={handleClick}
          class="bg-neutral-800 text-neutral-100 gap-2 flex items-center justify-center rounded-md px-3 py-1"
        >
          {loading ? (
            <>
              <div class="animate-spin border-b border-t rounded-full border-neutral-100 size-4 bg-neutral-800"></div>
              <p>{`Processing...`} </p>
            </>
          ) : (
            <p>Submit</p>
          )}
        </button>
      </form>
    </div>
  );
}

export default Form;
