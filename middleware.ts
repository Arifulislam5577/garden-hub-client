import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/forgot-password",
];

const profileRoutes = [
  "/",
  "/profile",
  "/change-password",
  "/my-post",
  "/my-favorites",
  "/follower",
];

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXT_PUBLIC_AUTH_SECRET;
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && profileRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(`/sign-in?redirect=${pathname}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/reset-password",
    "/forgot-password",
    "/profile",
    "/",
    "/change-password",
    "/my-post",
    "/my-favorites",
    "/follower",
  ],
};
