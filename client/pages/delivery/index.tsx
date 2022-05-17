import type { NextPage } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";

// Components
import ShippingForm from "../../components/ShippingForm";
import NavBar from "../../components/Navbar";

// Store
import { totalCart } from "../../redux/selectors";

// Store
import { useCartCheckoutMutation } from "../../services/cart";

const Delivery: NextPage = () => {
    // Store
    const selectTotalCart = useSelector(totalCart);
    const [saveOrder, { isError, isLoading, isSuccess }] = useCartCheckoutMutation();

    const handleSubmitOrder = async (
        address: string,
        addressType: string,
        city: string,
        zipCode: string,
        country: string,
        phone: string,
        deliveryOptionSelected: number
    ) => {
        // console.log({ test: "TEST", address, addressType, city, zipCode, country, phone, deliveryOptionSelected });
        const testResult = await saveOrder({
            test: "TEST",
            address,
            addressType,
            city,
            zipCode,
            country,
            phone,
            deliveryOptionSelected,
        }).unwrap();
        console.log({ testResult });
    };

    return (
        <>
            <NavBar />
            <section id="products" className="h-[calc(100vh_-_3.5rem)] px-64">
                <div className="w-full h-16 flex justify-center items-end">
                    <Link href="/cart">
                        <a className="z-50">
                            <div className="w-64 h-12 bg-gray-50 rounded-r-full grid place-content-center border border-solid border-sky-400">
                                <p className="text-xs text-gray-800 font-thin uppercase">1. Cart Review</p>
                            </div>
                        </a>
                    </Link>
                    <Link href="/order">
                        <a className=" z-40">
                            <div className="w-64 h-12 bg-sky-400 rounded-r-full grid place-content-center -ml-6">
                                <p className="text-xs text-white font-bold uppercase">2. Delivery Address</p>
                            </div>
                        </a>
                    </Link>
                    <Link href="/payment">
                        <a className="z-30">
                            <div className="w-64 h-12 bg-gray-50 rounded-r-full grid place-content-center -ml-6 border border-solid border-sky-400">
                                <p className="text-xs text-gray-800 font-thin uppercase">3. Payment</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="my-4 flex justify-between items-center">
                    <h1 className="text-xl uppercase font-bold">2. Delivery Address</h1>
                    <div className="text-right">
                        <p className="font-thin text-lg uppercase">
                            Total: <span className="ml-2 text-xl font-bold">{selectTotalCart} ETH</span>
                        </p>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <ShippingForm handleOnSubmitShipping={handleSubmitOrder} />
                </div>
            </section>
        </>
    );
};

export default Delivery;
