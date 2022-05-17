import React, { SetStateAction } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

// Icons
import { BsXLg } from "react-icons/bs";
import { ImBin } from "react-icons/im";

// Components
import { Button } from "../Common";
import FilterDivider from "../containers/ProductDetail/FilterDivider";

// Store
import { productsSlice } from "../../services/products";
import { removeItem } from "../../redux/states/cart";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { mergeCartItems, totalCart } from "../../redux/selectors";
import { useCartCheckoutMutation } from "../../services/cart";

// Types
import { ICart, IMergerCartItems } from "../../types";
import { clearErrorAuth } from "../../redux/states/auth";

interface IProps {
    setOpenListProducts: (value: SetStateAction<boolean>) => void;
}

const ListItems: NextPage<IProps> = ({ setOpenListProducts }) => {
    // Store
    const selectMergeCartItems: IMergerCartItems[] = useSelector(mergeCartItems);
    const selectTotalCart = useSelector(totalCart);
    const selectProducts = productsSlice.endpoints.getAll.select();
    // const cartItems = useAppSelector((state) => state.cart);
    const { errorAuth } = useAppSelector((state) => state.auth);
    const products = useSelector(selectProducts);
    const dispatch = useAppDispatch();
    // Router
    const router = useRouter();
    // Redux Toolkit Query
    // const [cartCheckout] = useCartCheckoutMutation();

    const handleRemoveItemFromCart = (idItem: string) => dispatch(removeItem(idItem));

    // const handleCheckout = async () => {
    //     try {
    //         const response: ICart = await cartCheckout(cartItems).unwrap();
    //         console.log("ListItems handleCheckout Success: ", { response });
    //     } catch (error) {
    //         console.log(" ListItems handleCheckout Error: ", { error });
    //     }
    // };

    return (
        <div
            className={`absolute w-[36rem]  ${
                selectMergeCartItems.length > 1 ? "h-[40rem]" : "h-[28rem]"
            } h-[40rem] overflow-auto px-12 py-4 bg-white text-black top-12 right-32 border-2 border-solid border-sky-400 z-50`}
        >
            <div className="w-full h-16 relative p-2">
                <div className="absolute right-0 h-12 w-12 p-4 bg-gray-50 rounded-full">
                    <BsXLg
                        className="cursor-pointer "
                        onClick={() => {
                            setOpenListProducts(false);
                            dispatch(clearErrorAuth());
                        }}
                    />
                </div>
            </div>
            <FilterDivider />
            {selectMergeCartItems.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                    <h1>No Items Found</h1>
                </div>
            ) : (
                <>
                    {selectMergeCartItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="w-48 h-48 flex justify-between p-8 min-w-full relative">
                                <Image
                                    src={`/assets/images/${
                                        products.isSuccess &&
                                        products.data.filter((product) => product._id === item._id)[0].productImages[0]
                                    }`}
                                    width="100"
                                    height="100"
                                    layout="fixed"
                                />

                                <div className="w-7/12 h-full relative">
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
                                    <div className="grid place-content-end">
                                        <ImBin
                                            className="cursor-pointer text-xl text-gray-500 hover:text-red-500"
                                            onClick={() => handleRemoveItemFromCart(item._id)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <FilterDivider />
                        </React.Fragment>
                    ))}
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
                        <div className="w-full my-4 flex justify-end items-center">
                            <Button title="Checkout" handleOnclick={() => router.push("/cart")} />
                            {/* <Button title="Checkout" handleOnclick={() => router.push("/order")} /> */}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ListItems;
