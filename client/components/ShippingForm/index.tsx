import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

// Components
import { Button, Form, Input, Select } from "../Common";

// Icons
import { ImArrowRight2, ImArrowLeft2 } from "react-icons/im";

interface IProps {
    handleOnSubmitShipping: (
        address: string,
        addressType: string,
        city: string,
        zipCode: string,
        country: string,
        phone: string,
        deliveryOptionSelected: number
    ) => void;
}

const deliveryOptions = [
    { _id: 0, title: "Delivery options", selected: true },
    { _id: 1, title: "Standard", selected: true },
    { _id: 2, title: "Standard overnight", selected: false },
    { _id: 3, title: "Overnight", selected: false },
];

const ShippingForm: NextPage<IProps> = ({ handleOnSubmitShipping }) => {
    // Local States
    const [address, setAddress] = useState("");
    const [addressType, setAddressType] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [deliveryOptionSelected, setDeliveryOptionSelected] = useState<number>(0);
    // Router
    const router = useRouter();

    const handleDeliveryOptions = (event: React.ChangeEvent<HTMLSelectElement>) =>
        setDeliveryOptionSelected(parseInt(event.target.value));

    return (
        <Form
            handleOnSubmit={(e) => {
                e.preventDefault();
                handleOnSubmitShipping(address, addressType, city, zipCode, country, phone, deliveryOptionSelected);
                router.push("/payment");
            }}
        >
            <div className="w-full my-2">
                <Input handleOnChange={(e) => setAddress(e.target.value)} placeHolder="Address" value={address} />
            </div>
            <div className="w-full my-2">
                <Input
                    handleOnChange={(e) => setAddressType(e.target.value)}
                    placeHolder="Aparment, Door, etc... (Optional)"
                    value={addressType}
                />
            </div>
            <div className="w-full my-2">
                <Input handleOnChange={(e) => setCity(e.target.value)} placeHolder="City" value={city} />
            </div>
            <div className="w-full my-2">
                <Input handleOnChange={(e) => setZipCode(e.target.value)} placeHolder="Zip Code" value={zipCode} />
            </div>
            <div className="w-full my-2">
                <Input handleOnChange={(e) => setCountry(e.target.value)} placeHolder="Country" value={country} />
            </div>
            <div className="w-full my-2">
                <Input handleOnChange={(e) => setPhone(e.target.value)} placeHolder="Phone (Optional)" value={phone} />
            </div>
            <div className="w-full my-2">
                <Select
                    data={deliveryOptions}
                    handleOnChange={handleDeliveryOptions}
                    valueSelected={deliveryOptionSelected}
                    fullWidth={true}
                />
            </div>

            <div className="w-full my-2 flex justify-between items-center">
                <Button
                    title="Cart Review"
                    handleOnclick={() => router.push("/cart")}
                    withIcon={true}
                    customCss="flex-row-reverse"
                >
                    <ImArrowLeft2 className="text-sky-400 text-lg" />
                </Button>
                <Button title="Next" type="submit" withIcon={true}>
                    <ImArrowRight2 className="text-sky-400 text-lg" />
                </Button>
            </div>
        </Form>
    );
};

export default ShippingForm;
