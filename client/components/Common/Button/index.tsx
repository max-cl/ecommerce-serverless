import type { NextPage } from "next";

type TButton = "button" | "submit" | "reset" | undefined;

interface IProps {
    type?: TButton;
    title: string;
    handleOnclick?: () => void;
    disabled?: boolean;
    customCss?: string;
}

const Button: NextPage<IProps> = ({ type = "button", title, handleOnclick, disabled = false, customCss = "py-4" }) => {
    return (
        <>
            {type === "button" && (
                <button
                    type={type}
                    className={`${customCss} px-8 uppercase rounded-md bg-gray-800 text-white disabled:opacity-25 disabled:cursor-not-allowed`}
                    onClick={handleOnclick}
                    disabled={disabled}
                >
                    {title}
                </button>
            )}

            {type === "submit" && (
                <button
                    type={type}
                    className={`${customCss} px-8 uppercase rounded-md bg-gray-800 text-white disabled:opacity-25 disabled:cursor-not-allowed`}
                    disabled={disabled}
                >
                    {title}
                </button>
            )}
        </>
    );
};

export default Button;
