import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

// Components
import NavBar from "../../components/Navbar";
import ProductDetailContainer from "../../components/containers/ProductDetail";

// Hooks
import { useGetAllQuery } from "../../services/products";

// Data Filters
import { productSizesData } from "./filterData";

// Store
import { useAppDispatch } from "../../hooks/redux";
import { addItem } from "../../redux/states/cart";

interface IProductBuyed {
    _id: string;
    quantity: number;
    color: string;
    size: string;
    price: number;
}

interface IFilterSizes {
    label: string;
    description: string;
    isActive: boolean;
}

const initalProductBuyedState: IProductBuyed = {
    _id: "0",
    quantity: 0,
    color: "",
    size: "",
    price: 0,
};

const ProductDetail: NextPage = () => {
    // Router
    const router = useRouter();
    const { id, isError, isLoading } = router.query;
    // RTK Query
    const { product } = useGetAllQuery(undefined, {
        selectFromResult: ({ data, isError, isLoading }) => ({
            product: data?.find((product) => product._id === id),
            isError,
            isLoading,
        }),
    });
    // Local States
    const [productBuyed, setProductBuyed] = useState<IProductBuyed>(initalProductBuyedState);
    const [productSizes, setProductSizes] = useState<IFilterSizes[]>(productSizesData);

    // Store
    const dispatch = useAppDispatch();

    const handleProductSize = (labelSize: string) => {
        setProductBuyed({
            ...productBuyed,
            size: labelSize,
            _id: product ? product._id : "",
            color: product ? product.productColor : "",
            price: product ? product.productPrice : 0,
        });

        let productSizesNotActive = productSizes.map((size) => ({
            label: size.label,
            description: size.description,
            isActive: false,
        }));

        const indexSelected = productSizes.findIndex((x) => x.label === labelSize);
        productSizesNotActive[indexSelected].isActive = true;
        setProductSizes(productSizesNotActive);
    };

    const handleOnchangeItemQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const itemQuantity = isNaN(parseInt(event.target.value))
            ? 0
            : parseInt(event.target.value) >= 10
            ? 10
            : parseInt(event.target.value);
        setProductBuyed({
            ...productBuyed,
            quantity: itemQuantity,
        });
    };

    const handleAddToCart = () => {
        dispatch(addItem(productBuyed));
    };

    if (isError) return <div className="w-screen h-screen flex justify-center items-center">Something went wrong</div>;
    if (isLoading) return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>;
    if (!product) return <div className="w-screen h-screen flex justify-center items-center">Missing product!</div>;

    return (
        <>
            <NavBar isLogo={true} />
            <ProductDetailContainer
                productImages={product?.productImages}
                productName={product?.productName}
                productPrice={product?.productPrice}
                sizes={productSizes.filter((x) => product.productSize.includes(x.label))}
                handleOnClickSizes={handleProductSize}
                titleBtn1="-"
                titleBtn2="+"
                handleOnclickBtn1={() =>
                    setProductBuyed((prev) => ({
                        ...productBuyed,
                        _id: product._id,
                        quantity: prev.quantity === 0 ? 0 : prev.quantity - 1,
                    }))
                }
                handleOnclickBtn2={() =>
                    setProductBuyed((prev) => ({
                        ...productBuyed,
                        _id: product._id,
                        quantity: prev.quantity === 10 ? 10 : prev.quantity + 1,
                    }))
                }
                handleOnchangeItemQuantity={handleOnchangeItemQuantity}
                productBuyedQuantity={productBuyed.quantity}
                handleAddToCart={handleAddToCart}
                productDescription={product.productDescription}
                productDetails={product.productDetails}
                productColor={product.productColor}
                productBuyedSize={productBuyed.size}
            />
        </>
    );
};

export default ProductDetail;
