import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Store
import { useAppSelector } from "../../hooks/redux";

interface IProps {}

const STAGES = [
    { id: 1, label: "Cart Review", url: "/cart" },
    { id: 2, label: "Delivery Address", url: "/delivery" },
    { id: 3, label: "Payment", url: "/payment" },
];

const CheckoutTimeLine: NextPage<IProps> = () => {
    const router = useRouter();
    const { errorAuth, isSignedIn } = useAppSelector((state) => state.auth);

    useEffect(() => {
        !isSignedIn && router.push("/cart");
    }, [isSignedIn]);

    return (
        <div className="w-full h-24 mb-8 flex justify-center items-end">
            {isSignedIn ? (
                <>
                    {STAGES.map((stage) => (
                        <Link href={`${stage.url}`}>
                            <a>
                                <div
                                    className={`w-64 h-12 rounded-r-full grid place-content-center -ml-6 ${
                                        stage.url === router.asPath
                                            ? "bg-sky-400"
                                            : "bg-gray-50 border border-solid border-sky-400"
                                    }`}
                                >
                                    <p
                                        className={`text-xs uppercase ${
                                            stage.url === router.asPath
                                                ? "text-white font-bold"
                                                : "text-gray-800 font-thin"
                                        }`}
                                    >
                                        {`${stage.id}. ${stage.label}`}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    ))}
                </>
            ) : (
                <Link href="/cart">
                    <a>
                        <div className="w-64 h-12 bg-sky-400 rounded-r-full grid place-content-center">
                            <p className="text-xs text-white font-bold uppercase">1. Cart Review</p>
                        </div>
                    </a>
                </Link>
            )}
        </div>

        // <div className="w-full h-16 flex justify-center items-end">
        //     <Link href="/cart">
        //         <a className="z-50">
        //             <div className="w-64 h-12 bg-sky-400 rounded-r-full grid place-content-center">
        //                 <p className="text-xs text-white font-bold uppercase">1. Cart Review</p>
        //             </div>
        //         </a>
        //     </Link>
        //     {isSignedIn && (
        //         <>
        //             <Link href="/delivery">
        //                 <a className="z-40">
        //                     <div className="w-64 h-12 bg-gray-50 rounded-r-full grid place-content-center -ml-6 border border-solid border-sky-400">
        //                         <p className="text-xs text-gray-800 font-thin uppercase">2. Delivery Address</p>
        //                     </div>
        //                 </a>
        //             </Link>

        //             <Link href="/payment">
        //                 <a className="z-30">
        //                     <div className="w-64 h-12 bg-gray-50 rounded-r-full grid place-content-center -ml-6 border border-solid border-sky-400">
        //                         <p className="text-xs text-gray-800 font-thin uppercase">3. Payment</p>
        //                     </div>
        //                 </a>
        //             </Link>
        //         </>
        //     )}
        // </div>
    );
};

export default CheckoutTimeLine;
