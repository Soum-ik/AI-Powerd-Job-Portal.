import { CheckCookieAuth } from "./lib/Next-auth/MiddlewareHelper.js";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return await CheckCookieAuth(request);
  }
  if (request.nextUrl.pathname.startsWith("/jobs/new")) {
    return await CheckCookieAuth(request);
  }
  if (request.nextUrl.pathname.startsWith("/api/job")) {
    return await CheckCookieAuth(request);
  }
}
