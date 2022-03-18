import { NextPage } from "next";
import Image from "next/image";

interface IProps {
    images: string[];
    setItemSelected: (value: React.SetStateAction<number>) => void;
    itemSelected: number;
}

const ThumbnailsCarousel: NextPage<IProps> = ({ images, itemSelected, setItemSelected }) => {
    const handleOnError = () => {
        return "https://fakeimg.pl/48x64/ff0000/";
    };

    return (
        <div className="w-20 h-full absolute top-0 left-8">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`${
                        index === itemSelected ? "bg-white border-2 border-solid border-gray-200" : "bg-gray-200"
                    } w-full h-24 flex justify-center items-center cursor-pointer my-2`}
                    onClick={() => setItemSelected(index)}
                >
                    {img ? (
                        <Image src={`/assets/images/${img}`} width={48} height={64} />
                    ) : (
                        <Image src="/assets/images/blur-img.png" width={48} height={64} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ThumbnailsCarousel;
