import {
  CheckCookieAuth,
  AdmimChecker as VerifyAdminAccess,
} from "./lib/Next-auth/MiddlewareHelper.js";

export async function middleware(request) {
  console.log("Requested URL Pathname:", request.nextUrl.pathname);
  console.log(request.nextUrl.pathname, "run");

  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("admin checking");
    return await VerifyAdminAccess(request);
  } else {
    return await CheckCookieAuth(request);
  }
}

export const config = {
  matcher: ["/jobs/new", "/recuters", "/api/job", "/admin"],
};
