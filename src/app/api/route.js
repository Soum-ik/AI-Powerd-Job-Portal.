import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    let result = "da";
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ status: "fail", error: error });
  }
}
