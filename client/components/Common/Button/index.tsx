import type { NextPage } from "next";

type TButton = "button" | "submit" | "reset" | undefined;

interface IProps {
    type?: TButton;
    title: string;
    handleOnclick?: () => void;
    disabled?: boolean;
    customCss?: string;
    children?: React.ReactNode;
    withIcon?: boolean;
}

const Button: NextPage<IProps> = ({
    type = "button",
    title,
    handleOnclick,
    disabled = false,
    customCss = "",
    children = <></>,
    withIcon = false,
}) => {
    return (
        <>
            {type === "button" && (
                <button
                    type={type}
                    className={`${customCss} w-56 px-8 py-4 uppercase rounded-md bg-gray-800 text-white disabled:opacity-25 disabled:cursor-not-allowed ${
                        withIcon ? "flex justify-between items-center" : ""
                    }`}
                    onClick={handleOnclick}
                    disabled={disabled}
                >
                    {withIcon ? (
                        <>
                            {title} {children}
                        </>
                    ) : (
                        <>{title}</>
                    )}
                </button>
            )}

            {type === "submit" && (
                <button
                    type={type}
                    className={`${customCss} w-56 px-8 py-4 uppercase rounded-md bg-gray-800 text-white disabled:opacity-25 disabled:cursor-not-allowed ${
                        withIcon ? "flex justify-between items-center" : ""
                    }`}
                    disabled={disabled}
                >
                    {withIcon ? (
                        <>
                            {title} {children}
                        </>
                    ) : (
                        <>{title}</>
                    )}
                </button>
            )}
        </>
    );
};

export default Button;
