import type { NextRequest } from "next/server";
import { serialize } from "cookie";

export default async function handler(req: NextRequest, res: any) {
  const serialised = serialize("AdminUserJwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);

  res.status(200).json({ message: "Successfuly logged out!" });
}
