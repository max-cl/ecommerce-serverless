interface ICart {
    _id: string;
    quantity: number;
    color: string;
    size: string;
    price: number;
}

interface IMergeCartItems {
    _id: string;
    color: string;
    price: number;
    subtotal: number;
    quantity: number;
}

export type { ICart, IMergeCartItems };
