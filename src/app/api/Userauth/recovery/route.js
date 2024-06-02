import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import sendEmail from "@/utility/EmailSender";
const prisma = new PrismaClient();

//  send 6 digit otp on mail
export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const _isAvailable = await prisma.user.count({ where: { email: email } });
    //   randomm number genrator
    const _randomNumberGenretor = Math.floor(Math.random() * 130000);
    console.log(_randomNumberGenretor, "random number genrator");
    if (_isAvailable === 1) {
      const _updateOtp = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          opt: _randomNumberGenretor,
        },
      });

      const EmailText = `"Don't share this pin with someone ${_randomNumberGenretor}"`;
      const EmailSubject = "Password Reset";
      const EmailTo = email;
      await sendEmail(EmailText, EmailSubject, EmailTo);

      return NextResponse.json({
        status: 200,
        data: _updateOtp,
        message: "6 digit data send successfully",
      });
    }

    return NextResponse.json({
      message: "Email is not valid",
      status: 404,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({
      message: "Something want wrong",
      status: "fail",
      error: error,
    });
  }
}

// otp validation
export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const otp  = parseInt(reqBody)
    console.log(typeof(reqBody), "body found");

    const verifiyCode = await prisma.user.count({
      where: {
        opt: otp,
      },
    });

    if (verifiyCode === 1) {
      return NextResponse.json({
        status: 200,
        message: "Valid  Code",
        data: verifiyCode,
      });
    } else
      return NextResponse.json({
        status: 404,
        message: "Your Code is not validF",
      });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ status: "fail", error: error });
  }
}

// update password
export async function PUT(req, res) {
  try {
    const reqBody = await req.json();

    const { email, password } = reqBody;

    console.log(email);
    console.log(password);

    const update = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: password,
        opt: 0,
      },
    });

    return NextResponse.json({
      message: "Your Password are updated",
      status: 200,
      data: update,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({
      message: "Your Password are not update something want wrong",
      status: 204,
      error: error,
    });
  }
}
