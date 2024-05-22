import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Create new job
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    if (!reqBody) {
      return NextResponse.json({ status: "Data Not Found" }, { status: 400 });
    }

    let { title, salary, officeLocation, location, ...rest } = reqBody;

    if (!title || !salary) {
      return NextResponse.json(
        { status: "Title or Salary missing" },
        { status: 400 }
      );
    }

    salary = Number(salary);

    if (isNaN(salary)) {
      return NextResponse.json(
        { status: "Invalid salary format" },
        { status: 400 }
      );
    }

    const randomNumberMaker = Math.floor(Math.random() * 10) + 1;
    const slugMaker = `${title
      .split(" ")
      .join("-")
      .toLowerCase()}-${randomNumberMaker}`;
    const combiningLocaiton = `${officeLocation}, ${location}`;

    // Construct the jobData object with only the fields defined in the schema
    const jobData = {
      ...rest,
      title,
      salary,
      location: combiningLocaiton,
      slug: slugMaker,
    };

    const data = await prisma.job.create({ data: jobData });

    return NextResponse.json(
      {
        status: "Successfully data added",
        data: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { status: "fail", error: error.message },
      { status: 500 }
    );
  }
}


// get all jobs
export async function GET(req, res) {
  try {
    const data = await prisma.job.findMany({});
    return NextResponse.json(
      { status: "Successfully get Data", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { status: "fail", error: error.message },
      { status: 500 }
    );
  }
}
