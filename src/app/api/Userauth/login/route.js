import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { CreateToken } from "@/lib/Next-auth/jwtHelper";

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const result = await prisma.user.findUnique({
      where: { email: email, password: password },
    });
    if (!result) {
      return NextResponse.json({
        status: 204,
        message: "Something Want Wrong, Please Check Your Password",
      });
    }
    let createToken = await CreateToken(result);
    const experiData = new Date(Date.now() + 24 * 60 * 60 * 3600);
    const cookieString = `token=${createToken}; expires=${experiData.toUTCString()}; path=/ `;
    return NextResponse.json(
      { status: 200, data: createToken },
      { headers: { "set-cookie": cookieString } }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ status: "fail", error: error });
  }
}
