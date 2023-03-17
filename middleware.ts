import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const userToken = request.cookies.get("userJwt")?.value;
  const token = request.cookies.get("AdminUserJwt")?.value;

  const verifiedUserToken =
    userToken &&
    (await verifyAuth(userToken).catch((error) => {
      console.log(error);
    }));

  if (request.url.match("/user")) {
    if (!verifiedUserToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (
    request.url.includes("/login") ||
    request.url.includes("/register")
  ) {
    if (verifiedUserToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((error) => {
      console.log(error);
    }));

  if (request.url.match("/admin")) {
    if (request.url.includes("/admin/dashboard")) {
      if (!verifiedToken) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } else if (request.url.includes("/admin/login")) {
      if (verifiedToken) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
  }
}
