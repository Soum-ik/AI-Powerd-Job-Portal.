"use server";
import { cookies } from "next/headers";
import prisma from "../prisma";
import { VerifyToken } from "./jwtHelper";
import { revalidatePath } from "next/cache";

export const RoleChecker = async () => {
  const cookie = cookies();

  const data = cookie.get("token")?.value;
  if (data) {
    const token = await VerifyToken(data);
    let profile = await prisma.user.findUnique({
      where: {
        id: token.id,
      },
    });
    return profile;
  }
};

export const deleteCookie = async () => {
  cookies().delete("token");
  revalidatePath("/jobs");
};
