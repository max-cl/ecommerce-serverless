import { NextPage } from "next";

// Icons
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface IProps {
    imagesLength: number;
    setItemSelected: (value: React.SetStateAction<number>) => void;
    itemSelected: number;
}

const ArrowsCarousel: NextPage<IProps> = ({ imagesLength, itemSelected, setItemSelected }) => {
    return (
        <div className="w-full h-full px-24 absolute flex justify-between items-center">
            <div className="h-12 w-12 left-0 grid place-content-center z-50 opacity-10 hover:opacity-100 hover:bg-gray-100 hover:rounded-full">
                <FaAngleLeft
                    className="text-4xl cursor-pointer"
                    onClick={() => setItemSelected(itemSelected - 1 < 0 ? imagesLength - 1 : itemSelected - 1)}
                />
            </div>
            <div className="h-12 w-12 right-4 grid place-content-center z-50 opacity-10 hover:opacity-100 hover:bg-gray-100 hover:rounded-full">
                <FaAngleRight
                    className=" text-4xl cursor-pointer"
                    onClick={() => setItemSelected(itemSelected + 1 > imagesLength - 1 ? 0 : itemSelected + 1)}
                />
            </div>
        </div>
    );
};

export default ArrowsCarousel;
