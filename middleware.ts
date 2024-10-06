import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./lib/getCurrentUser";

const AuthRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/profile/],
  admin: [/^\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/sign-in?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => RegExp(route).exec(pathname))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:page*",
    "/admin",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ],
};
