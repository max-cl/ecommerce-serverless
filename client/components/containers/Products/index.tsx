import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

// Components
import { Divider } from "../../Common";
import Filters from "../../Filters";

interface IProps {
    data: {
        _id: string;
        productName: string;
        productPrice: number;
        productImages: string[];
        productType: string;
        productStock: number;
        productColor: string;
        productSize: string[];
        productDescription: { title: string; description: string };
        productDetails: { title: string; material: string; made: string };
        productGender: { _id: number; title: string };
        productBrand: { _id: number; title: string };
    }[];
    handleFilterGender: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleFilterBrand: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCleanFilters: () => void;
    genderSelected: number;
    brandSelected: number;
}

const ProductsContainer: NextPage<IProps> = ({
    data,
    handleFilterGender,
    handleFilterBrand,
    handleCleanFilters,
    genderSelected,
    brandSelected,
}) => {
    return (
        <section id="products" className="h-screen mt-14">
            {/* FIlters */}
            <div className="w-full px-64 h-32 bg-gray-50 flex justify-center items-center">
                <div className="w-full flex justify-between items-center">
                    <Filters
                        handleFilterBrand={handleFilterBrand}
                        handleFilterGender={handleFilterGender}
                        handleCleanFilters={handleCleanFilters}
                        genderSelected={genderSelected}
                        brandSelected={brandSelected}
                    />
                </div>
            </div>
            <Divider />
            <div className="w-full h-full">
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {data.map((d, index) => (
                        <div
                            className="flex-grow-1 flex-shrink-0 basis-full h-[320px] sm:basis-[25%] lg:h-[400px]"
                            key={index}
                        >
                            <Link href={`/products/${d._id}`}>
                                <a>
                                    <div className="h-full bg-gray-50 flex justify-center items-center flex-col relative">
                                        {d.productImages.length > 0 ? (
                                            <>
                                                <Image
                                                    src={`/assets/images/${d.productImages[0]}`}
                                                    width={200}
                                                    height={200}
                                                />
                                                <div className="text-xs my-2 px-1 absolute bottom-2 left-4">
                                                    <p className="font-bold">{d.productName}</p>
                                                    <p className="font-light">{`${d.productPrice} ETH`}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <Image src="/assets/images/blur-img.png" width={200} height={200} />
                                        )}
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsContainer;
