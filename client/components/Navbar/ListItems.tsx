import React, { SetStateAction } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useSelector } from "react-redux";

// Icons
import { BsXLg, BsTrashFill } from "react-icons/bs";

// Components
import { Button } from "../Common";
import FilterDivider from "../containers/ProductDetail/FilterDivider";

// Store
import { productsSlice } from "../../services/products";
import { removeItem } from "../../redux/states/cart";
import { useAppDispatch } from "../../hooks/redux";
import { mergeCartItems, totalCart } from "../../redux/selectors";

interface IProps {
    setOpenListProducts: (value: SetStateAction<boolean>) => void;
}

const ListItems: NextPage<IProps> = ({ setOpenListProducts }) => {
    // Store
    const selectMergeCartItems = useSelector(mergeCartItems);
    const selectTotalCart = useSelector(totalCart);
    const selectProducts = productsSlice.endpoints.getAll.select();
    const products = useSelector(selectProducts);
    const dispatch = useAppDispatch();

    const handleRemoveItemFromCart = (idItem: string) => dispatch(removeItem(idItem));

    return (
        <div className="absolute w-96 h-96 overflow-auto p-4 py-4 bg-white text-black top-12 right-[50px] border-2 border-solid border-sky-400 z-40">
            <div className="w-full p-4 flex justify-end">
                <BsXLg className="cursor-pointer" onClick={() => setOpenListProducts(false)} />
            </div>
            <FilterDivider />
            {selectMergeCartItems.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                    <h1>No Items Found</h1>
                </div>
            ) : (
                <>
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
                                                products.data.filter(
                                                    (product: { _id: any }) => product._id === item._id
                                                )[0].productName}
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
                    <div className="w-full">
                        <div className="w-full my-4 text-right">
                            <p className="w-full font-thin text-lg uppercase">
                                Total: <span className="mx-4 text-lg font-bold">{selectTotalCart} ETH</span>
                            </p>
                        </div>
                        <div className="w-full my-4 flex justify-between items-center">
                            <Button title="View Bag" handleOnclick={() => console.log("View Bag")} />
                            <Button title="Checkout" handleOnclick={() => console.log("PAY")} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ListItems;
