import { serialize } from "cookie";

export default async function handler(req: any, res: any) {
  const serialised = serialize("userJwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);

  res.status(200).json({ message: "Successfuly logged out!" });
}
