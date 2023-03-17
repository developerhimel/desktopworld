import type { NextApiRequest } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_URL as string
  );

  const db = client.db("cc");

  const products = db.collection("products");
  const data = await products
    .find()
    .sort({ updatedAt: -1 })
    // .limit(30)
    .toArray();
  res.json(data);
  client.close();
}
