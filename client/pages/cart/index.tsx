import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// Components
import CartContainer from "../../components/containers/Cart";
import NavBar from "../../components/Navbar";

// Store
import { mergeCartItems, totalCart } from "../../redux/selectors";
import { productsSlice } from "../../services/products";
import { removeItem } from "../../redux/states/cart";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

// Types
import { IMergeCartItems } from "../../types";

// Utils
import { setItemToLocalStorage } from "../../utils/localStorage";

const Cart: NextPage = () => {
    // Store
    const selectMergeCartItems: IMergeCartItems[] = useSelector(mergeCartItems);
    const selectProducts = productsSlice.endpoints.getAll.select();
    const { data = [], isSuccess } = useSelector(selectProducts);
    const selectTotalCart = useSelector(totalCart);
    const { errorAuth, isSignedIn } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    // Router
    const router = useRouter();

    const handleRemoveItemFromCart = (idItem: string) => dispatch(removeItem(idItem));

    const handleGoToLogin = () => {
        setItemToLocalStorage("previousPath", router.asPath);
    };

    return (
        <>
            <NavBar />
            <CartContainer
                selectMergeCartItems={selectMergeCartItems}
                products={{ data, isSuccess }}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                selectTotalCart={selectTotalCart}
                errorAuth={errorAuth}
                isSignedIn={isSignedIn ? isSignedIn : false}
                router={router}
                handleGoToLogin={handleGoToLogin}
            />
        </>
    );
};

export default Cart;
