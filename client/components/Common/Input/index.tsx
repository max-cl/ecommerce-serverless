import { NextPage } from "next";

interface IProps {
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeHolder: string;
    type?: string;
}

const Input: NextPage<IProps> = ({ handleOnChange, value, placeHolder, type = "text" }) => {
    return (
        <input
            className="w-full appearance-none block px-8 py-2 text-base font-normal text-gray-700
                        bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                        transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            onChange={handleOnChange}
            value={value}
            placeholder={`Your ${placeHolder}`}
            type={type}
        />
    );
};

export default Input;
