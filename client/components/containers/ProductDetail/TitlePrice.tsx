import type { NextPage } from "next";

interface IProps {
    title: string;
    value: number;
}

const TitlePrice: NextPage<IProps> = ({ title = "", value = 0 }) => {
    return (
        <p className="w-full py-4 text-gray-400 flex justify-between items-center">
            {title}
            <span className="text-black font-bold">{`${value} ETH`}</span>
        </p>
    );
};

export default TitlePrice;
