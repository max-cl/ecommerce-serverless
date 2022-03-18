import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";

// Components
import DotsCarousel from "./DotsCarousel";
import ThumbnailsCarousel from "./ThumbnailsCarousel";
import ArrowsCarousel from "./ArrowsCarousel";

interface IProps {
    images: string[];
    withDots?: boolean;
}

type TItemSelected = number;

const Carousel: NextPage<IProps> = ({ images, withDots = true }) => {
    const [itemSelected, setItemSelected] = useState<TItemSelected>(0);

    return (
        <div className="h-full w-full pl-40 pr-16 pb-24 pt-12 flex justify-center items-center relative bg-gray-50">
            {images.length > 0 ? (
                <>
                    <ArrowsCarousel
                        setItemSelected={setItemSelected}
                        itemSelected={itemSelected}
                        imagesLength={images.length}
                    />
                    <ThumbnailsCarousel images={images} setItemSelected={setItemSelected} itemSelected={itemSelected} />

                    <Image src={`/assets/images/${images[itemSelected]}`} width={480} height={480} />

                    {withDots && (
                        <DotsCarousel
                            setItemSelected={setItemSelected}
                            itemSelected={itemSelected}
                            imagesLength={images.length}
                        />
                    )}
                </>
            ) : (
                <Image src="/assets/images/blur-img.png" width={560} height={560} />
            )}
        </div>
    );
};

export default Carousel;
