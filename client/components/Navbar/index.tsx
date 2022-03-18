import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";

// Icons
import { BsHandbag, BsPerson } from "react-icons/bs";
import { GiTargetArrows } from "react-icons/gi";
import { ImArrowLeft } from "react-icons/im";

// Store
import { useAppSelector } from "../../hooks/redux";
import { selectCartQuantity } from "../../redux/selectors";

// Components
import ListItems from "./ListItems";
import { Button } from "../Common";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";

interface IProps {
    isLogo?: boolean;
}

const NavBar: NextPage<IProps> = ({ isLogo = true }) => {
    // Store
    const selectCartProductSumQuantity = useSelector(selectCartQuantity);
    const cart = useAppSelector((state) => state.cart);

    // Local States
    const [openListProducts, setOpenListProducts] = useState<boolean>(false);
    const [openLoginForm, setOpenLoginForm] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    return (
        <header className="w-full h-14 z-50 bg-black text-white">
            <nav className="h-full flex justify-center items-center">
                <div className="w-2/12 pl-32 text-2xl">
                    {isLogo ? (
                        <Link href="/">
                            <a>
                                <GiTargetArrows />
                            </a>
                        </Link>
                    ) : (
                        <Link href="/#products">
                            <a>
                                <ImArrowLeft className="absolute top-4 left-24 text-2xl z-10" />
                            </a>
                        </Link>
                    )}
                </div>
                <ul className="w-8/12 flex justify-end items-center uppercase tracking-[0.25rem] text-xs">
                    <Link href="/#home">
                        <a>
                            <li className="font-bold pr-16 cursor-pointer">Home</li>
                        </a>
                    </Link>
                    <Link href="/#products">
                        <a>
                            <li className="pr-16 cursor-pointer">Products</li>
                        </a>
                    </Link>
                </ul>

                <div className="w-2/12 flex justify-between items-center pr-32">
                    <span className="relative cursor-pointer">
                        <BsPerson onClick={() => setOpenLoginForm((prev) => !prev)} className="text-xl" />
                    </span>
                    {openLoginForm && (
                        <div className="absolute w-96 h-72 overflow-auto p-8 bg-white text-black top-12 right-[50px] border-2 border-solid border-sky-400 z-40 flex justify-center items-center flex-col">
                            <div className="w-full flex justify-evenly py-2">
                                <Button title="Login" handleOnclick={() => setIsSignUp(false)} disabled={!isSignUp} />
                                <Button title="SignUp" handleOnclick={() => setIsSignUp(true)} disabled={isSignUp} />
                            </div>
                            {isSignUp ? <SignUpForm /> : <LoginForm />}
                        </div>
                    )}
                    <span className="relative cursor-pointer">
                        {selectCartProductSumQuantity > 0 && (
                            <div className="absolute top-[-0.75rem] right-[-1rem] w-5 h-5 rounded-full bg-sky-400 opacity-80 text-xs flex justify-center items-center">
                                {selectCartProductSumQuantity}
                            </div>
                        )}
                        <BsHandbag
                            onClick={() => (cart.length > 0 ? setOpenListProducts((prev) => !prev) : false)}
                            className="text-xl"
                        />
                    </span>
                    {openListProducts && <ListItems setOpenListProducts={setOpenListProducts} />}
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
