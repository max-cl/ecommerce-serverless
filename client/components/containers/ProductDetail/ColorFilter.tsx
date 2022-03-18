import type { NextPage } from "next";

// Components
import TitleFilter from "./TitleFilter";

interface IProps {
    colors: { label: string; isActive: boolean; description: string }[];
    handleOnClick: (label: string) => void;
}

const ColorFilter: NextPage<IProps> = ({ colors, handleOnClick }) => {
    return (
        <>
            <TitleFilter title="Color Options" />
            <div className="flex flex-wrap justify-center items-center">
                {colors.map((color, index) => (
                    <span
                        key={index}
                        className={`w-8 h-8 rounded-full bg-${color.label}-400 cursor-pointer mx-1 ${
                            color.isActive ? "border-4 border-solid border-gray-800" : ""
                        }`}
                        onClick={() => handleOnClick(color.label)}
                    />
                ))}
            </div>
        </>
    );
};

export default ColorFilter;
