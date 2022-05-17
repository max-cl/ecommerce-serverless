import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextRouter } from "next/router";

// Components
import { Button } from "../../Common";
import FilterDivider from "../../containers/ProductDetail/FilterDivider";
import { ServerErrors } from "../../Common/ServerErrors";

// Icons
import { ImBin, ImArrowRight2 } from "react-icons/im";

// Types
import { IMergerCartItems, IProduct, TError } from "../../../types";

interface IProps {
    selectMergeCartItems: IMergerCartItems[];
    products: { isSuccess: boolean; data: IProduct[] };
    handleRemoveItemFromCart: (idItem: string) => { payload: string; type: string };
    selectTotalCart: number;
    errorAuth: TError;
    isSignedIn: boolean;
    router: NextRouter;
    handleGoToLogin: () => void;
}

const CartContainer: NextPage<IProps> = ({
    selectMergeCartItems,
    products,
    handleRemoveItemFromCart,
    selectTotalCart,
    errorAuth,
    isSignedIn,
    router,
    handleGoToLogin,
}) => {
    return (
        <section id="products" className="h-[calc(100vh_-_3.5rem)] px-64">
            <div className="w-full h-16 flex justify-center items-end">
                <Link href="/cart">
                    <a className="z-50">
                        <div className="w-64 h-12 bg-sky-400 rounded-r-full grid place-content-center">
                            <p className="text-xs text-white font-bold uppercase">1. Cart Review</p>
                        </div>
                    </a>
                </Link>
                <Link href="/delivery">
                    <a className="z-40">
                        <div className="w-64 h-12 bg-gray-50 rounded-r-full grid place-content-center -ml-6 border border-solid border-sky-400">
                            <p className="text-xs text-gray-800 font-thin uppercase">2. Delivery Address</p>
                        </div>
                    </a>
                </Link>

                <Link href="/payment">
                    <a className="z-30">
                        <div className="w-64 h-12 bg-gray-50 rounded-r-full grid place-content-center -ml-6 border border-solid border-sky-400">
                            <p className="text-xs text-gray-800 font-thin uppercase">3. Payment</p>
                        </div>
                    </a>
                </Link>
            </div>

            <div className="my-4 flex justify-start items-center">
                <h1 className="text-xl uppercase font-bold">1. Cart Review</h1>
            </div>
            <div>
                {selectMergeCartItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="w-full flex justify-between p-4 min-w-full">
                            <div className="w-5/12 grid place-content-center">
                                <div className="w-40 h-40">
                                    <Image
                                        src={`/assets/images/${
                                            products.isSuccess &&
                                            products.data.filter((product) => product._id === item._id)[0]
                                                .productImages[0]
                                        }`}
                                        width="100"
                                        height="100"
                                        layout="responsive"
                                    />
                                </div>
                            </div>

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

                <ServerErrors errorAuth={errorAuth} isSignedIn={isSignedIn} handleGoToLogin={handleGoToLogin} />

                {isSignedIn && (
                    <div className="w-full my-4 flex justify-end items-center">
                        <Button title="Delivery" handleOnclick={() => router.push("/delivery")} withIcon={true}>
                            <ImArrowRight2 className="text-sky-400 text-lg" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CartContainer;
