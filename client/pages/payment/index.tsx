import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// Components
import { Button } from "../../components/Common";
import NavBar from "../../components/Navbar";

// Icons
import { ImArrowLeft2 } from "react-icons/im";
import { AiFillDollarCircle } from "react-icons/ai";

// Store
import { totalCart } from "../../redux/selectors";
import CheckoutTimeLine from "../../components/CheckoutTimeLine";

interface IProps {}

const Delivery: NextPage<IProps> = ({}) => {
    // Store
    const selectTotalCart = useSelector(totalCart);
    // Router
    const router = useRouter();

    // const handleOnSubmitShipping = (
    //     address: string,
    //     addressType: string,
    //     city: string,
    //     zipCode: string,
    //     country: string,
    //     phone: string,
    //     deliveryOptionSelected: number
    // ) => {
    //     console.log({ test: "TEST", address, addressType, city, zipCode, country, phone, deliveryOptionSelected });
    // };

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
                    {/* <ShippingForm handleOnSubmitShipping={handleOnSubmitShipping} /> */}
                    <div className="w-full my-4 flex justify-between items-center">
                        <Button
                            title="Delivery"
                            handleOnclick={() => router.push("/delivery")}
                            withIcon={true}
                            customCss="flex-row-reverse"
                        >
                            <ImArrowLeft2 className="text-sky-400 text-lg" />
                        </Button>
                        <Button title="Pay Now" withIcon={true} handleOnclick={() => console.log("Pay Now!! ")}>
                            <AiFillDollarCircle className="text-sky-400 text-lg" />
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Delivery;
