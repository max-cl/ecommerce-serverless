import type { NextPage } from "next";

// Components
import TitleFilter from "./TitleFilter";

interface IProps {
    sizes: { label: string; isActive: boolean }[];
    handleOnClick: (label: string) => void;
}

const SizeFilter: NextPage<IProps> = ({ sizes, handleOnClick }) => {
    return (
        <>
            <TitleFilter title="Size" />
            <div className="flex flex-wrap justify-center items-center">
                {sizes.map((size, index) => (
                    <span
                        key={index}
                        className={`w-8 h-8 rounded-full cursor-pointer mx-1 ${
                            size.isActive ? "bg-gray-900" : "bg-gray-400"
                        } text-white text-xs flex justify-center items-center`}
                        onClick={() => handleOnClick(size.label)}
                    >
                        {size.label}
                    </span>
                ))}
            </div>
        </>
    );
};

export default SizeFilter;
