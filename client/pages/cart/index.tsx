import React, { useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// Components
import { Button } from "../../components/Common";
import FilterDivider from "../../components/containers/ProductDetail/FilterDivider";

// Icons
import { BsHandbag } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";

// Store
import { mergeCartItems, totalCart } from "../../redux/selectors";
import { productsSlice } from "../../services/products";
import { removeItem } from "../../redux/states/cart";
import { useAppDispatch } from "../../hooks/redux";

const Cart: NextPage = () => {
    // Store
    const selectMergeCartItems = useSelector(mergeCartItems);
    const selectProducts = productsSlice.endpoints.getAll.select();
    const products = useSelector(selectProducts);
    const selectTotalCart = useSelector(totalCart);
    const dispatch = useAppDispatch();
    // Router
    const router = useRouter();

    const handleRemoveItemFromCart = (idItem: string) => dispatch(removeItem(idItem));

    useEffect(() => {
        if (selectMergeCartItems.length === 0) {
            router.push("/#products");
        }
    });

    return (
        <section id="products" className="h-screen py-16 px-64">
            <div className="p-8 flex justify-start items-center">
                <h1 className="text-4xl uppercase font-bold">Cart</h1>
                <BsHandbag className="text-2xl" />
            </div>
            <div>
                {selectMergeCartItems.map((item: any, index) => (
                    <React.Fragment key={index}>
                        <div className="w-full flex justify-between p-4">
                            <Image
                                src={`/assets/images/${
                                    products.isSuccess &&
                                    products.data.filter((product: { _id: any }) => product._id === item._id)[0]
                                        .productImages[0]
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
                                            products.data.filter((product: { _id: any }) => product._id === item._id)[0]
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
                                    <BsTrashFill
                                        className="cursor-pointer text-xl text-gray-800"
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
                <div className="w-full my-4 flex justify-between items-center">
                    <Button title="Go to Products" handleOnclick={() => router.push("/#products")} />
                    <Button title="Checkout" handleOnclick={() => console.log("PAY")} />
                </div>
            </div>
        </section>
    );
};

export default Cart;
