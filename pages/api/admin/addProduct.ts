import type { NextApiRequest } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const { product } = req.body;
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_URL as string
    );

    const db = client.db("cc");

    const products = db.collection("products");
    const insertProduct = {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const result = await products.insertOne(insertProduct);
      if (result) {
        res.json({ message: "product inserted." });
      } else {
        res.json({ message: "product inserted failed." });
      }
    } catch (error) {
      res.json({ message: "something went wrong." });
    }
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
