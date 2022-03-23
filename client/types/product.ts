export interface IProduct {
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
}
