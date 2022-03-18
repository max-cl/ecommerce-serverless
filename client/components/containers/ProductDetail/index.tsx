import type { NextPage } from "next";

// Components
import { Divider } from "../../Common";
import ProductDetailMainContainer from "./ProductDetailMainContainer";
import ProductDetailRightContainer from "./ProductDetailRightContainer";

type TButton = "button" | "submit" | "reset" | undefined;

interface IProps {
    productImages: string[];
    productName: string;
    productPrice: number;
    btnType?: TButton;
    titleBtn1: string;
    titleBtn2: string;
    handleOnclickBtn1: () => void;
    handleOnclickBtn2: () => void;
    inputType?: string;
    handleOnchangeItemQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sizes: { label: string; isActive: boolean }[];
    handleOnClickSizes: (label: string) => void;
    productBuyedQuantity: number;
    handleAddToCart: () => void;
    productDescription: { title: string; description: string };
    productDetails: { title: string; material: string; made: string };
    productColor: string;
    productBuyedSize: string;
}

const ProductDetailContainer: NextPage<IProps> = ({
    productImages,
    productName = "",
    productPrice = 0,
    titleBtn1,
    titleBtn2,
    handleOnclickBtn1,
    handleOnclickBtn2,
    handleOnchangeItemQuantity,
    sizes,
    handleOnClickSizes,
    productBuyedQuantity,
    handleAddToCart,
    productDescription,
    productDetails,
    productColor,
    productBuyedSize,
}) => {
    return (
        <section id="products" className="w-full h-full relative">
            {/* <Divider /> */}
            <div className="w-full h-full grid grid-cols-12">
                {/* Main Panel */}
                <div className="w-full h-full col-start-1 col-end-10 grid grid-rows-6 ">
                    <ProductDetailMainContainer
                        productImages={productImages}
                        productDescription={productDescription}
                        productDetails={productDetails}
                    />
                </div>

                {/* Right Panel */}
                <div className="col-start-10 col-end-13">
                    <ProductDetailRightContainer
                        sizes={sizes}
                        handleOnClickSizes={handleOnClickSizes}
                        titleBtn1={titleBtn1}
                        titleBtn2={titleBtn2}
                        handleOnclickBtn1={handleOnclickBtn1}
                        handleOnclickBtn2={handleOnclickBtn2}
                        handleOnchangeItemQuantity={handleOnchangeItemQuantity}
                        productPrice={productPrice}
                        productBuyedQuantity={productBuyedQuantity}
                        handleAddToCart={handleAddToCart}
                        productName={productName}
                        productDescription={productDescription}
                        productColor={productColor}
                        productBuyedSize={productBuyedSize}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductDetailContainer;
