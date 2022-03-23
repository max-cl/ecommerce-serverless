// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../config/mongodb";

// type IProduct = {
//     _id: string;
//     productName: string;
//     productPrice: number;
//     productImages: string[];
//     productType: string;
//     productStock: number;
//     // color: string[];
//     productColor: string;
//     productSize: string[];
//     productDescription: { title: string; description: string };
//     productDetails: { title: string; material: string; made: string };
//     productGender: { _id: number; title: string };
//     productBrand: { _id: number; title: string };
// };

// type IProduct = WithId<Document>;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any[]>) {
    if (req.method === "POST") {
        // Process a POST request
        console.log({ dataPost: req.body });
    } else if (req.method === "GET") {
        // Handle any other HTTP method
        // const client = await clientPromise;
        // const db = client.db(process.env.MONGODB_DB);
        // const data = await db.collection("products").find().toArray();
        // // const data = await db.collection("products").find().toArray();
        // console.log({ data });
        // res.status(200).json(data);
    } else {
        // Handle any other HTTP method
        // res.status(200).json({ message: "John Doe" });
    }
}
