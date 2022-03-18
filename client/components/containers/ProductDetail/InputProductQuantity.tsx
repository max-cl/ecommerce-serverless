import type { NextPage } from "next";

type TButton = "button" | "submit" | "reset" | undefined;

interface IProps {
    btnType?: TButton;
    titleBtn1: string;
    titleBtn2: string;
    handleOnclickBtn1: () => void;
    handleOnclickBtn2: () => void;
    inputType?: string;
    inputValue: number;
    handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputProductQuantity: NextPage<IProps> = ({
    btnType = "button",
    titleBtn1,
    titleBtn2,
    handleOnclickBtn1,
    handleOnclickBtn2,
    inputType = "text",
    inputValue,
    handleOnchange,
}) => {
    return (
        <div className="flex justify-center items-center whitespace-nowrap">
            <button
                type={btnType}
                className="w-2/12 border border-r-0 border-solid border-gray-200 rounded rounded-r-none text-gray-500 text-xl p-1"
                onClick={handleOnclickBtn1}
            >
                {titleBtn1}
            </button>
            <input
                type={inputType}
                value={inputValue}
                className="w-4/12 outline-gray-200 text-center text-xl rounded-none border border-solid border-gray-200 p-1"
                onChange={handleOnchange}
            />
            <button
                type={btnType}
                className="w-2/12 border border-l-0 border-solid border-gray-200 rounded rounded-l-none text-gray-500 text-xl p-1"
                onClick={handleOnclickBtn2}
            >
                {titleBtn2}
            </button>
        </div>
    );
};

export default InputProductQuantity;
