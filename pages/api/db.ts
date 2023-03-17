import type { NextApiRequest } from "next";
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_URL as string
  );

  const db = client.db("cc");

  const collections = db.collection("products");

  const exits = await collections
    .find({ category: { $exists: false } })
    // .limit(50)
    .toArray();

  //   const result = await collections.find({ subCategory: "Proccesor" }).toArray();

  //   result.forEach(async (item: any) => {
  //     const id = new ObjectId(item._id);
  //     await collections.findOneAndUpdate(
  //       { _id: id },
  //       { $set: { subCategory: "Processor" } }
  //     );
  //   });

  client.close();

  res.json(exits);
}
