import { NextPage } from "next";
import React from "react";

// Icons
import { FaCircle, FaRegCircle } from "react-icons/fa";

interface IProps {
    setItemSelected: (value: React.SetStateAction<number>) => void;
    itemSelected: number;
    imagesLength: number;
}

const DotsCarousel: NextPage<IProps> = ({ setItemSelected, itemSelected, imagesLength }) => {
    return (
        <div className="w-full px-[30rem] absolute bottom-16 flex justify-between items-center">
            {[...Array(imagesLength)].map((img, index) => (
                <React.Fragment key={index}>
                    {index === itemSelected ? (
                        <FaCircle onClick={() => setItemSelected(index)} className="cursor-pointer" />
                    ) : (
                        <FaRegCircle onClick={() => setItemSelected(index)} className="cursor-pointer" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default DotsCarousel;
