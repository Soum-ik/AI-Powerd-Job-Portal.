"use server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { VerifyToken } from "./jwtHelper";

export const RoleChecker = async () => {
  const prisma = new PrismaClient();
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
};
