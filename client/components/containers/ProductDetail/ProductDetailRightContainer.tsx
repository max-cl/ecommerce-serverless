import type { NextPage } from "next";

// Components
import { Button } from "../../Common";
import FilterDivider from "./FilterDivider";
import InputProductQuantity from "./InputProductQuantity";
import SizeFilter from "./SizeFilter";
import TitleFilter from "./TitleFilter";
import TitlePrice from "./TitlePrice";

type TButton = "button" | "submit" | "reset" | undefined;

interface IProps {
    btnType?: TButton;
    titleBtn1: string;
    titleBtn2: string;
    handleOnclickBtn1: () => void;
    handleOnclickBtn2: () => void;
    inputType?: string;
    handleOnchangeItemQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sizes: { label: string; isActive: boolean }[];
    handleOnClickSizes: (label: string) => void;
    productPrice: number;
    productName: string;
    productBuyedQuantity: number;
    handleAddToCart: () => void;
    productDescription: { title: string; description: string };
    productColor: string;
    productBuyedSize: string;
}

const ProductDetailRightContainer: NextPage<IProps> = ({
    titleBtn1,
    titleBtn2,
    handleOnclickBtn1,
    handleOnclickBtn2,
    handleOnchangeItemQuantity,
    sizes,
    handleOnClickSizes,
    productPrice,
    productName,
    productBuyedQuantity,
    handleAddToCart,
    productDescription,
    productColor,
    productBuyedSize,
}) => {
    return (
        <>
            <div className="px-8 py-4">
                <TitleFilter title={`${productName}`} />
                <p className="text-xs">{productDescription?.description}</p>
            </div>
            <FilterDivider />
            <div className="px-8 py-4">
                <TitleFilter title="Color" />
                <div className="flex flex-wrap justify-center items-center">
                    <span className={`w-8 h-8 rounded-full bg-${productColor}-400`} />
                </div>
            </div>

            <FilterDivider />
            <div className="px-8 py-4">
                <SizeFilter sizes={sizes} handleOnClick={handleOnClickSizes} />
            </div>
            <FilterDivider />
            <div className="px-8 py-4 flex justify-between flex-col">
                <TitleFilter title="Item Price and Quantity" />
                <InputProductQuantity
                    titleBtn1={titleBtn1}
                    titleBtn2={titleBtn2}
                    handleOnclickBtn1={handleOnclickBtn1}
                    handleOnclickBtn2={handleOnclickBtn2}
                    inputValue={productBuyedQuantity}
                    handleOnchange={handleOnchangeItemQuantity}
                />

                <TitlePrice title={``} value={productPrice} />
            </div>
            <FilterDivider />
            <div className="px-8 py-4 flex justify-center items-center flex-col">
                <TitlePrice title="TOTAL" value={parseFloat((productPrice * productBuyedQuantity).toFixed(2))} />
                <Button
                    title="Add to Bag"
                    handleOnclick={handleAddToCart}
                    disabled={productBuyedQuantity === 0 || productBuyedSize === "" ? true : false}
                />
            </div>
        </>
    );
};

export default ProductDetailRightContainer;
