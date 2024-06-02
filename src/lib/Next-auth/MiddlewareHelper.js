import { NextResponse } from "next/server";
import { VerifyToken } from "./jwtHelper.js";

export async function CheckCookieAuth(req) {
  try {
    let token = req.cookies.get("token");
    if (!token) {
      throw new Error("Token not found in cookies");
    }
    let payload = await VerifyToken(token["value"]);

    var requestHeader = new Headers(req.headers);
    // console.log(requestHejader, "this is a request header option");
    requestHeader.set("token", payload);
    requestHeader.set("email", payload.email);
    requestHeader.set("id", payload.id);
    // console.log(requestHeader, "this is a request modified header option");
    
    return NextResponse.next({
      request: { headers: requestHeader },
    });
  } catch (error) {
    console.log(error, "error message");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
