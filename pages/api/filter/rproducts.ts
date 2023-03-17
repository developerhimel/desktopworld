import type { NextApiRequest } from "next";
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const { cg, scg } = req.body;
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_URL as string
    );

    const db = client.db("cc");

    const products = db.collection("products");

    const filteredProducts1 = await products
      .find({ subCategory: scg })
      // .sort({ createdAt: -1 })
      .limit(8)
      .toArray();
    const filteredProducts2 = await products
      .find({ category: cg })
      // .sort({ createdAt: -1 })
      .limit(8)
      .toArray();

    const filteredProducts = [
      ...filteredProducts1,
      ...filteredProducts2,
    ] as any;
    
    const by_id = {} as any;

    for (const item of filteredProducts) by_id[item._id] = item;

    const uniques = Object.values(by_id);

    res.json({
      filteredProducts: uniques,
    });

    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
