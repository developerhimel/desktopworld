import type { NextApiRequest } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const { order } = req.body;
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_URL as string
    );

    const db = client.db("cc");

    const collection = db.collection("orders");
    const insertNewOrder = { ...order, createdAt: new Date() };

    try {
      const result = await collection.insertOne(insertNewOrder);
      if (result) {
        res.json({ message: "new order inserted.", id: result.insertedId });
      } else {
        res.json({ message: "something went wrong." });
      }
    } catch (error) {
      res.json(error);
    }
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
