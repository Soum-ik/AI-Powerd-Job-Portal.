import { NextResponse } from "next/server";
import { VerifyToken } from "./jwtHelper.js";

export async function CheckCookieAuth(req) {
  try {
    const token = req.cookies.get("token");

    // catch requested route
    let requestedRoute = req.nextUrl.pathname;
    requestedRoute = requestedRoute.toString();

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
    requestHeader.set("route", requestedRoute);

    return NextResponse.next({
      request: { headers: requestHeader },
    });
  } catch (error) {
    console.log("Middleware Error:   problem ", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export async function UserApiChecking(req) {
  try {
    const token = req.cookies.get("token");

    // catch requested route
    let requestedRoute = req.nextUrl.pathname;
    requestedRoute = requestedRoute.toString();
    console.log(requestedRoute, 'checking fro route');

    
    const payload = await VerifyToken(token["value"]);
    console.log(payload, "after payload check ing");

    if (!payload.email || !payload.id) {
      throw new Error("Invalid token payload");
    }

    const requestHeader = new Headers(req.headers);
    requestHeader.set("email", payload.email);
    requestHeader.set("id", payload.id);
    requestHeader.set("role", payload.role);
    requestHeader.set("route", requestedRoute);

    return NextResponse.next({
      request: { headers: requestHeader },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { status: "fail", data: "unauthorized" },
      { status: 401 },
    );
  }
}

export async function AdmimChecker(req) {
  try {
    const token = req.cookies.get("token");

    // catch requested route
    let requestedRoute = req.nextUrl.pathname;
    requestedRoute = requestedRoute.toString();

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
      return NextResponse.redirect(new URL("/admin/access", req.url));
    }

    const requestHeader = new Headers(req.headers);
    requestHeader.set("email", payload.email);
    requestHeader.set("id", payload.id);
    requestHeader.set("role", payload.role);
    requestHeader.set("route", requestedRoute);

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
