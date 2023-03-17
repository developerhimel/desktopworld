import type { NextApiRequest } from "next";
import { MongoClient } from "mongodb";
var CryptoJS = require("crypto-js");

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const { fullName, username, password } = req.body;
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_URL as string
    );

    const db = client.db("cc");

    const users = db.collection("admin");

    const foundUser = await users.findOne({
      username: username,
    });

    if (foundUser) {
      res.json({ message: "user already exists" });
    } else {
      await users
        .insertOne({
          fullName: fullName,
          username: username,
          password: CryptoJS.AES.encrypt(
            password,
            process.env.NEXT_PUBLIC_SECRET_KEY
          ).toString(),
          verified: false,
        })
        .then(() => {
          res.status(200).json({ message: "new admin inserted" });
        })
        .catch((error) => {
          res.json({ message: error });
        });
    }

    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
