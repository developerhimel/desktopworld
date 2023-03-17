import type { NextApiRequest } from "next";
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const { id, cg, scg, escg } = req.body;
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_URL as string
    );

    const db = client.db("cc");

    const collection = db.collection("products");
    const update = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { category: cg, subCategory: scg, extraSubCategory: escg } }
    );
    res.json(update);
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
