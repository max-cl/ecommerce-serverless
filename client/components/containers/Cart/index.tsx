import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextRouter } from "next/router";

// Components
import { Button } from "../../Common";
import FilterDivider from "../../containers/ProductDetail/FilterDivider";

// Icons
import { BsHandbag } from "react-icons/bs";
import { ImBin } from "react-icons/im";

// Types
import { IMergerCartItems, IProduct, TError } from "../../../types";

interface IProps {
    selectMergeCartItems: IMergerCartItems[];
    products: { isSuccess: boolean; data: IProduct[] };
    handleRemoveItemFromCart: (idItem: string) => { payload: string; type: string };
    selectTotalCart: number;
    errorAuth: TError;
    handleCartCheckout: () => Promise<void>;
    router: NextRouter;
}

const CartContainer: NextPage<IProps> = ({
    selectMergeCartItems,
    products,
    handleRemoveItemFromCart,
    selectTotalCart,
    errorAuth,
    handleCartCheckout,
    router,
}) => {
    return (
        <section id="products" className="h-[calc(100vh_-_3.5rem)] px-64">
            <div className="p-8 flex justify-start items-center">
                <h1 className="text-4xl uppercase font-bold">Cart</h1>
                <BsHandbag className="text-2xl" />
            </div>
            <div>
                {selectMergeCartItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="w-full flex justify-between p-4 min-w-full">
                            <Image
                                src={`/assets/images/${
                                    products.isSuccess &&
                                    products.data.filter((product) => product._id === item._id)[0].productImages[0]
                                }`}
                                width="100"
                                height="100"
                            />

                            <div className="w-7/12 h-full">
                                <p className="flex justify-between w-full font-thin text-xs uppercase mb-2">
                                    Sku:
                                    <span className="text-xs font-bold">{item._id}</span>
                                </p>
                                <p className="flex justify-between w-full font-thin text-xs uppercase mb-2">
                                    Item:
                                    <span className="text-xs font-bold uppercase">
                                        {products.isSuccess &&
                                            products.data.filter((product) => product._id === item._id)[0].productName}
                                        {` (${item.quantity})`}
                                    </span>
                                </p>
                                <p className="flex justify-between w-full font-thin text-xs uppercase mb-2">
                                    Amount: <span className="text-xs font-bold">{item.quantity}</span>
                                </p>
                                <p className="flex justify-between w-full font-thin text-xs uppercase mb-2">
                                    Color: <span className="text-xs font-bold">{item.color}</span>
                                </p>
                                <p className="flex justify-between w-full font-thin text-xs uppercase mb-2">
                                    Subtotal: <span className="text-xs font-bold">{item.subtotal} ETH</span>
                                </p>
                                <div className="grid place-content-end py-4">
                                    <ImBin
                                        className="cursor-pointer text-2xl text-gray-500 hover:text-red-500"
                                        onClick={() => handleRemoveItemFromCart(item._id)}
                                    />
                                </div>
                            </div>
                        </div>
                        <FilterDivider />
                    </React.Fragment>
                ))}
            </div>
            <div className="w-full">
                <div className="w-full my-4 text-right">
                    <p className="w-full font-thin text-lg uppercase">
                        Total: <span className="mx-4 text-lg font-bold">{selectTotalCart} ETH</span>
                    </p>
                </div>
                {errorAuth.status === 401 &&
                    (errorAuth.message === "Unauthorized" ||
                        errorAuth.message === "The incoming token has expired") && (
                        <div className="w-full my-12 px-16 p-4 flex justify-between items-center bg-gray-100">
                            <h1 className="text-xs font-light text-red-500">
                                {errorAuth.message === "The incoming token has expired"
                                    ? "Your session has expired. Please, signIn again."
                                    : `You have to signIn, before to be able to checkout.`}
                            </h1>
                            <Link href="/login">
                                <a className="text-xs font-light text-sky-400 border-b border-solid border-sky-400">
                                    Go to Login
                                </a>
                            </Link>
                        </div>
                    )}
                <div className="w-full my-4 flex justify-between items-center">
                    <Button title="Go to Products" handleOnclick={() => router.push("/products")} />

                    {errorAuth.status === 401 &&
                    (errorAuth.message === "Unauthorized" || errorAuth.message === "The incoming token has expired") ? (
                        <></>
                    ) : (
                        <Button title="Checkout" handleOnclick={handleCartCheckout} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default CartContainer;
