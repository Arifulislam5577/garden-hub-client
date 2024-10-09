import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./actions/actions";

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

  console.log(user);

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/sign-in?redirect=${pathname}`, request.url)
      );
    }
  }

  const userRole = user?.role as Role;

  if (userRole && roleBasedRoutes[userRole]) {
    const allowedRoutes = roleBasedRoutes[userRole];

    const hasAccess = allowedRoutes.some((route) => route.test(pathname));

    if (hasAccess) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/admin",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/profile",
    "/my-post",
    "/follower",
    "/my-favorites",
    "/change-password",
  ],
};
