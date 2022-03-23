import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// Components
import { Spinner } from "../../components/Common";
import CartContainer from "../../components/containers/Cart";
import NavBar from "../../components/Navbar";

// Store
import { mergeCartItems, totalCart } from "../../redux/selectors";
import { productsSlice } from "../../services/products";
import { removeItem } from "../../redux/states/cart";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useCartCheckoutMutation } from "../../services/cart";

// Types
import { ICart, IMergerCartItems } from "../../types";

const Cart: NextPage = () => {
    // Store
    const selectMergeCartItems: IMergerCartItems[] = useSelector(mergeCartItems);
    const selectProducts = productsSlice.endpoints.getAll.select();
    const { data = [], isSuccess, isLoading, isError } = useSelector(selectProducts);
    const selectTotalCart = useSelector(totalCart);
    const cartItems = useAppSelector((state) => state.cart);
    const { errorAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    // Router
    const router = useRouter();
    // Redux Toolkit Query
    const [cartCheckout] = useCartCheckoutMutation();

    const handleRemoveItemFromCart = (idItem: string) => dispatch(removeItem(idItem));

    // useEffect(() => {
    //     if (selectMergeCartItems.length === 0) {
    //         router.push("/products");
    //     }
    // });

    const handleCartCheckout = async () => {
        try {
            const response: ICart = await cartCheckout(cartItems).unwrap();
            console.log("Cart Route handleCartCheckout Success: ", { response });
        } catch (error) {
            console.log("Cart Route handleCartCheckout Error: ", { error });
        }
    };

    // if (isError) return <div className="w-screen h-screen flex justify-center items-center">Something went wrong</div>;

    // if (isLoading)
    //     return (
    //         <div className="w-screen h-screen flex justify-center items-center">
    //             <Spinner />
    //         </div>
    //     );

    // if (!data) return <div className="w-screen h-screen flex justify-center items-center">Missing products!</div>;

    return (
        <>
            <NavBar />
            <CartContainer
                selectMergeCartItems={selectMergeCartItems}
                products={{ data, isSuccess }}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                selectTotalCart={selectTotalCart}
                errorAuth={errorAuth}
                handleCartCheckout={handleCartCheckout}
                router={router}
            />
        </>
    );
};

export default Cart;
