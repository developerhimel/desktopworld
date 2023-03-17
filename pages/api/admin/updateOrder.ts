import type { NextApiRequest } from "next";
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const { id, action } = req.body;
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_URL as string
    );

    const db = client.db("cc");

    const collection = db.collection("orders");

    if (action === "approve") {
      await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { orderStatus: "processing", updatedAt: new Date() } }
      );
      res.json({ message: "success" });
    } else if (action === "cancel") {
      await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { orderStatus: "cancelled", updatedAt: new Date() } }
      );
      res.json({ message: "success" });
    } else if (action === "complete") {
      await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { orderStatus: "delivered", updatedAt: new Date() } }
      );
      res.json({ message: "success" });
    }
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
