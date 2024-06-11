import {
  CheckCookieAuth,
  AdmimChecker as VerifyAdminAccess,
  statusChecker,
} from "./lib/Next-auth/MiddlewareHelper.js";

export async function middleware(request) {
  let requestedRoute = request.nextUrl.pathname;

  if (requestedRoute.startsWith("/auth/login")) {
    return await statusChecker(request);
  } else if (requestedRoute.startsWith("/admin")) {
    return await VerifyAdminAccess(request);
  } else {
    return await CheckCookieAuth(request);
  }
}

export const config = {
  matcher: ["/jobs/new", "/recuters", "/api/job", "/admin", "/auth/login"],
};
