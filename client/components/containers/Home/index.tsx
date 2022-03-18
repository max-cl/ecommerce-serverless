import type { NextPage } from "next";
import Image from "next/image";

// Components
import { Divider } from "../../Common";

// Icons
import { CgArrowLongRight } from "react-icons/cg";

const HomeContainer: NextPage = () => {
    return (
        <section className="h-screen bg-[#ECECEE] relative" id="home">
            {/* <Divider /> */}
            <div className="w-full h-full grid grid-cols-12">
                <div className="w-full h-full col-start-1 col-end-6 pl-32 pr-40 pt-40">
                    <h1 className="text-4xl font-black uppercase tracking-wider">
                        <span className="text-blue-800 font-light">/</span> Sunglasses
                    </h1>
                    <p className="text-sm mt-4 mb-12 leading-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut expedita error distinctio nemo.
                        Expedita eligendi enim placeat dolore debitis cumque.
                    </p>
                    <button className="flex items-center justify-center py-4 px-12 uppercase text-xs rounded-sm text-blue-800 border-2 border-solid border-blue-800">
                        Buy 115 $
                    </button>
                </div>

                <div className="w-full h-full col-start-6 col-end-13 pl-24 pr-32 pt-40 grid grid-rows-6">
                    <div className="w-full h-full row-start-1 row-end-5">
                        <Image src="/assets/images/hero2.png" width={560} height={240} />
                    </div>
                    <div className="flex justify-end items-start row-start-5 row-end-7">
                        <div className="w-40 flex justify-between items-center text-xs">
                            01 <span className="block w-12 h-[1.25px] bg-gray-900" /> 04 <CgArrowLongRight />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeContainer;
