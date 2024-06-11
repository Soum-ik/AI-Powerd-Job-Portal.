import { NextResponse } from "next/server";
import { VerifyToken } from "./jwtHelper.js";

export async function CheckCookieAuth(req) {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      throw new Error("Token not found in cookies");
    }
    // Ensure the token value is a string
    const tokenValue = token["value"];
    if (typeof tokenValue !== "string") {
      throw new Error("Token value must be a string");
    }

    const payload = await VerifyToken(token["value"]);

    if (!payload.email || !payload.id) {
      throw new Error("Invalid token payload");
    }

    const requestHeader = new Headers(req.headers);
    requestHeader.set("email", payload.email);
    requestHeader.set("id", payload.id);
    requestHeader.set("role", payload.role);

    return NextResponse.next({
      request: { headers: requestHeader },
    });
  } catch (error) {
    console.log("Middleware Error:   problem ", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export async function AdmimChecker(req) {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      throw new Error("Token not found in cookies");
    }

    // Ensure the token value is a string
    const tokenValue = token["value"];
    if (typeof tokenValue !== "string") {
      throw new Error("Token value must be a string");
    }

    const payload = await VerifyToken(token["value"]);
    const role = payload.role;

    if (!payload.email || !payload.id) {
      throw new Error("Invalid token payload");
    }

    if (role !== "ADMIN") {
      // Corrected the role check condition
      return NextResponse.json({
        msg: "You're not eligible for this route!",
        status: 401,
      });
    }

    const requestHeader = new Headers(req.headers);
    requestHeader.set("email", payload.email);
    requestHeader.set("id", payload.id);
    requestHeader.set("role", payload.role);

    return NextResponse.next({
      request: { headers: requestHeader },
    });
  } catch (error) {
    console.log("Middleware Error:  insider ", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export async function statusChecker(req) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.next();
  }

  try {
    const payload = await VerifyToken(token["value"]);
    if (payload) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    console.log("Middleware Error:  insider ", error);

    return NextResponse.next();
  }

  return NextResponse.next();
}
