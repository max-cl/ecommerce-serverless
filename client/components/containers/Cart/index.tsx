import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { NextRouter } from "next/router";
import Link from "next/link";

// Components
import { Button, ServerErrors } from "../../Common";
import FilterDivider from "../../containers/ProductDetail/FilterDivider";
import CheckoutTimeLine from "../../CheckoutTimeLine";

// Icons
import { ImBin, ImArrowRight2 } from "react-icons/im";

// Types
import { IMergeCartItems, IProduct, TError } from "../../../types";

interface IProps {
    selectMergeCartItems: IMergeCartItems[];
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
            {selectMergeCartItems.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center flex-col">
                    <Image src={`/assets/images/cart-empty.svg`} width={320} height={320} />
                    <p>No items found</p>
                    <Link href="/products">
                        <a
                            className="text-xs font-light text-sky-400 border-b border-solid border-sky-400"
                            onClick={() => router.push("/products")}
                        >
                            Go to Products
                        </a>
                    </Link>
                </div>
            ) : (
                <>
                    <CheckoutTimeLine />
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
                                                    products.data.filter((product) => product._id === item._id)[0]
                                                        .productName}
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
                </>
            )}
        </section>
    );
};

export default CartContainer;
