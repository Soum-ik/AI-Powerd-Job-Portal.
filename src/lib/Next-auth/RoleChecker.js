"use server";
import { cookies } from "next/headers";
import prisma from "../prisma";
import { VerifyToken } from "./jwtHelper";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const RoleChecker = async (req) => {
  const cookie = cookies();

  const data = cookie.get("token")?.value;
  if (data) {
    const token = await VerifyToken(data);
    const profile = await prisma.user.findUnique({
      where: {
        id: token.id,
      },
    }); 
    return { profile };
  }
  return;
  // return redirect("/auth/login");
};

export const deleteCookie = async () => {
  cookies().delete("token");
  revalidatePath("/jobs");
};
