import type { NextApiRequest } from "next";
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_URL as string
  );

  const db = client.db("cc");

  const collections = db.collection("users");
  const products = await collections
    .find({ $and: [{ updatedAt: { $exists: true } }, { brand: "MSI" }] })
    .toArray();

  // products.forEach(async (item: any) => {
  //   const id = new ObjectId(item._id);
  //   await collections.findOneAndUpdate(
  //     { _id: id },
  //     { $set: { updatedAt: id.getTimestamp() } }
  //   );
  // });

  res.status(200).json(products);
}
