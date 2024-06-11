import {
  CheckCookieAuth,
  AdmimChecker as VerifyAdminAccess,
  statusChecker,
  UserApiChecking,
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
  matcher: ["/admin", "/recuters", "/jobs/new", "/auth/login", "/api/job"],
};
