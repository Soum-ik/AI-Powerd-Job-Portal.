import { CheckCookieAuth } from "./lib/Next-auth/MiddlewareHelper.js";

export async function middleware(request) {
  console.log(request.nextUrl.pathname, "run");
  return await CheckCookieAuth(request);
}

export const config = {
  matcher: ["/jobs/new","/admin", "/recuters", "/api/job"],
};
