import type { NextPage } from "next";
import { useSelector } from "react-redux";

// Components
import ShippingForm from "../../components/ShippingForm";
import NavBar from "../../components/Navbar";
import CheckoutTimeLine from "../../components/CheckoutTimeLine";

// Store
import { totalCart } from "../../redux/selectors";
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
                <CheckoutTimeLine />

                <div className="my-4 flex justify-between items-center">
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
