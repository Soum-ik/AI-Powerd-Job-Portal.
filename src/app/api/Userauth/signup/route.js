import { NextResponse } from "next/server";
import { userAuthSchema } from "../../../../lib/validation";
import prisma from "@/lib/prisma";
export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { success, data, error } = userAuthSchema.safeParse(reqBody);

    // error checking
    if (error) {
      return NextResponse.json({ status: 410, message: error });
    }

    if (success) {
      const { email } = data;

      // already created
      const Existing_dataa = await prisma.user.findUnique({
        where: { email: email },
      });
      if (Existing_dataa) {
        return NextResponse.json({
          message: "This email is already use!",
          status: 400,
        });
      }

      // final
      await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: data.password,
          image: data.image,
        },
      });
      return NextResponse.json({
        status: 200,
        message: "Account Create SuccessFully",
      });
    }
  } catch (error) {
    console.log("Error occurred:", error);
    return NextResponse.json({ status: "fail", error: error });
  }
}
