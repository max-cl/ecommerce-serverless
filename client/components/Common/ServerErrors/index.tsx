import { NextPage } from "next";
import Link from "next/link";

interface IProps {
    errorAuth: {
        status: number;
        message: string;
        isSignedIn?: boolean;
    };
    isSignedIn?: boolean;
    handleGoToLogin: () => void;
}

export const ServerErrors: NextPage<IProps> = ({ errorAuth, isSignedIn = false, handleGoToLogin }) => {
    return (
        <div className="w-full">
            {errorAuth.status === 401 && // 401 Unauthorized
                (errorAuth.message === "Unauthorized" || errorAuth.message === "The incoming token has expired") && (
                    <div className="w-full my-12 px-16 p-4 flex justify-between items-center bg-gray-100">
                        <h1 className="text-xs font-light text-red-500">
                            {errorAuth.message === "The incoming token has expired"
                                ? "Your session has expired. Please, signIn again."
                                : `You have to signIn, before to be able to checkout.`}
                        </h1>
                        <Link href="/login">
                            <a
                                className="text-xs font-light text-sky-400 border-b border-solid border-sky-400"
                                onClick={handleGoToLogin}
                            >
                                Go to Login
                            </a>
                        </Link>
                    </div>
                )}

            {/* {errorAuth.status === 403 &&
                errorAuth.message === "The user is not authenticated" && ( // 403 Forbidden
                    <div className="w-full my-12 px-16 p-4 flex justify-between items-center bg-gray-100">
                        <h1 className="text-xs font-light text-red-500">
                            You have to signIn, before to be able to checkout.
                        </h1>
                        <Link href="/login">
                            <a className="text-xs font-light text-sky-400 border-b border-solid border-sky-400">
                                Go to Login
                            </a>
                        </Link>
                    </div>
                )} */}

            {!isSignedIn && ( // When is not signedIn
                <div className="w-full my-12 px-16 p-4 flex justify-between items-center bg-gray-100">
                    <h1 className="text-xs font-light text-red-500">
                        You have to signIn, before to be able to checkout.
                    </h1>
                    <Link href="/login">
                        <a
                            className="text-xs font-light text-sky-400 border-b border-solid border-sky-400"
                            onClick={handleGoToLogin}
                        >
                            Go to Login
                        </a>
                    </Link>
                </div>
            )}
        </div>
    );
};
