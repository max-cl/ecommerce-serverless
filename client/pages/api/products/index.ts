// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { WithId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../config/mongodb";

// const data = [
//     {
//         _id: "1",
//         productName: "shirt1",
//         productPrice: 1,
//         productImages: [
//             "/assets/images/shirt-front.png",
//             "/assets/images/shirt-back.png",
//             "/assets/images/shirt-left.png",
//             "/assets/images/shirt-right.png",
//         ],
//         productType: "shirt",
//         productStock: 10,
//         // color: ["red", "blue", "green", "purple", "yellow"],
//         productColor: "red",
//         productSize: ["xs", "s", "m", "l", "xl"],
//         productDescription: { title: "title shirt1", description: "description shirt1" },
//         productDetails: { title: "title shirt1 info", material: "material shirt1", made: "made in china shirt1" },
//         productGender: { _id: 1, title: "Male" },
//         productBrand: { _id: 1, title: "Lee" },
//     },
//     {
//         _id: "2",
//         productName: "bag1",
//         productPrice: 2,
//         productImages: [
//             "/assets/images/bag-front.png",
//             "/assets/images/bag-back.png",
//             "/assets/images/bag-left.png",
//             "/assets/images/bag-right.png",
//         ],
//         productType: "bag",
//         productStock: 10,
//         // color: ["green", "yellow"],
//         productColor: "yellow",
//         productSize: ["st"],
//         productDescription: { title: "title bag1", description: "description bag1" },
//         productDetails: { title: "title bag1 info", material: "material bag1", made: "made in india bag1" },
//         productGender: { _id: 2, title: "Female" },
//         productBrand: { _id: 2, title: "Magasin" },
//     },
//     // {
//     //     _id: 3,
//     //     productName: "t-shirt",
//     //     productPrice: 50.99,
//     //     productImg: "/assets/images/t-shirt-red.png",
//     //     type: "tshirt",
//     //     stock: 10,
//     //     color: "red",
//     //     size: "xs",
//     // },
//     // {
//     //     _id: 4,
//     //     productName: "glasses",
//     //     productPrice: 300.99,
//     //     productImg: "/assets/images/glasses.png",
//     //     type: "glasses",
//     //     stock: 10,
//     //     color: "red",
//     //     size: "xs",
//     // },
//     // {
//     //     _id: 5,
//     //     productName: "short",
//     //     productPrice: 70.99,
//     //     productImg: "/assets/images/short.png",
//     //     type: "pant",
//     //     stock: 10,
//     //     color: "red",
//     //     size: "xs",
//     // },
// ];

type IProduct = {
    _id: string;
    productName: string;
    productPrice: number;
    productImages: string[];
    productType: string;
    productStock: number;
    // color: string[];
    productColor: string;
    productSize: string[];
    productDescription: { title: string; description: string };
    productDetails: { title: string; material: string; made: string };
    productGender: { _id: number; title: string };
    productBrand: { _id: number; title: string };
};

// type IProduct = WithId<Document>;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any[]>) {
    if (req.method === "POST") {
        // Process a POST request
    } else if (req.method === "GET") {
        // Handle any other HTTP method
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const data = await db.collection("products").find().toArray();
        // const data = await db.collection("products").find().toArray();
        console.log({ data });
        res.status(200).json(data);
    } else {
        // Handle any other HTTP method
        // res.status(200).json({ message: "John Doe" });
    }
}
