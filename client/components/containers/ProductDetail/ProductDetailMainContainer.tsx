import React, { useState } from "react";
import type { NextPage } from "next";

// Components
import Carousel from "../../Carousel";

interface IProps {
    productImages: string[];
    productDescription: { title: string; description: string };
    productDetails: { title: string; material: string; made: string };
}

const ProductDetailMainContainer: NextPage<IProps> = ({ productImages, productDescription, productDetails }) => {
    const [options, setOptions] = useState([
        { title: "Gallery", isActive: true },
        { title: "Description", isActive: false },
        { title: "Information", isActive: false },
    ]);

    const handleOnClickOptions = (titleSelected: string) => {
        const optionSelected = options.map((option) => {
            return {
                title: option.title,
                isActive: option.title === titleSelected ? true : false,
            };
        });
        setOptions(optionSelected);
    };

    return (
        <>
            <div className="flex justify-between items-center px-64 row-start-1 row-end-2">
                {options.map((option, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`h-10 w-40 rounded-md border border-black border-solid flex justify-center items-center cursor-pointer text-xs font-thin uppercase ${
                            option.isActive ? "bg-black text-white" : ""
                        }`}
                        onClick={() => handleOnClickOptions(option.title)}
                    >
                        {option.title}
                    </button>
                ))}
            </div>
            <div className="h-full w-full flex justify-center items-center row-start-2 row-end-7 relative">
                {options.map((option, index) =>
                    option.title === "Gallery" && option.isActive ? (
                        <Carousel images={productImages} withDots={true} key={index} />
                    ) : option.title === "Description" && option.isActive ? (
                        <div key={index}>
                            <h1>Description</h1>
                            <p>{JSON.stringify(productDescription)}</p>
                        </div>
                    ) : option.title === "Information" && option.isActive ? (
                        <div key={index}>
                            <h1>Information</h1>
                            <p>{JSON.stringify(productDetails)}</p>
                        </div>
                    ) : (
                        <React.Fragment key={index}></React.Fragment>
                    )
                )}
            </div>
        </>
    );
};

export default ProductDetailMainContainer;
