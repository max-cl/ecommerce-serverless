import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";

// Icons
import { BsBoxSeam, BsShop, BsPerson } from "react-icons/bs";
import { IoBagOutline, IoPersonOutline } from "react-icons/io5";
import { ImArrowLeft } from "react-icons/im";

// Store
import { useAppSelector } from "../../hooks/redux";
import { selectCartQuantity } from "../../redux/selectors";

// Components
import ListItems from "./ListItems";
import { Button } from "../Common";

// Custom Hooks
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";

interface IProps {
    isLogo?: boolean;
}

// Sections
const sections = [
    { _id: 0, label: "Home", url: "/" },
    { _id: 1, label: "Products", url: "/products" },
];

const NavBar: NextPage<IProps> = ({ isLogo = true }) => {
    // Store
    const selectCartProductSumQuantity: number = useSelector(selectCartQuantity);
    const cart = useAppSelector((state) => state.cart);
    const { isSignedIn } = useAppSelector((state) => state.auth);
    // Router
    const router = useRouter();
    // Custom Hooks useAuth (AWS Cognito)
    const { signOut } = useAuth({
        options: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
            userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID,
            region: process.env.NEXT_PUBLIC_AWS_REGION,
        },
    });
    // Local States
    const [openListProducts, setOpenListProducts] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    return (
        <header className="w-full h-14 z-50 bg-black text-white">
            <nav className="h-full flex justify-center items-center">
                <div className="w-2/12 pl-32 text-xl">
                    {isLogo ? (
                        <Link href="/">
                            <a>
                                <BsShop className="text-sky-400" />
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
                    {sections.map((section) => (
                        <Link href={section.url} key={section._id}>
                            <a>
                                <li
                                    className={`${
                                        router.asPath === section.url ? "font-bold" : ""
                                    } pr-16 cursor-pointer`}
                                >
                                    {section.label}
                                </li>
                            </a>
                        </Link>
                    ))}

                    {/* <Link href="/#home">
                        <a>
                            <li className="font-bold pr-16 cursor-pointer">Home</li>
                        </a>
                    </Link>
                    <Link href="/#products">
                        <a>
                            <li className="pr-16 cursor-pointer">Products</li>
                        </a>
                    </Link> */}
                </ul>

                <div className="w-2/12 flex justify-center items-center pr-32">
                    <span className="relative cursor-pointer mr-2">
                        <IoPersonOutline
                            onClick={() => setOpenProfile((prev) => !prev)}
                            className={`text-xl ${isSignedIn ? "text-sky-400" : ""}`}
                        />
                    </span>
                    {openProfile && (
                        <div className="absolute w-96 h-72 overflow-auto p-8 bg-white text-black top-12 right-[50px] border-2 border-solid border-sky-400 z-40 flex justify-center items-center flex-col">
                            {isSignedIn ? (
                                <div className="w-full flex justify-center items-center py-2">
                                    <Button title="Logout" handleOnclick={() => signOut()} />
                                </div>
                            ) : (
                                <div className="w-full h-12 flex justify-start items-center flex-row">
                                    <Link href="/login">
                                        <a className="hover:text-sky-400 mr-2">Login</a>
                                    </Link>
                                    <div className="h-[20px] border-l-2 border-solid border-sky-400" />
                                    <Link href="/signup">
                                        <a className="hover:text-sky-400 ml-2">SignUp</a>
                                    </Link>
                                </div>
                            )}
                            <div className="w-full flex justify-evenly flex-col items-start">
                                <Link href="">
                                    <a className="w-full flex justify-start items-center hover:text-sky-400 my-2">
                                        <BsPerson className="text-xl mr-4" /> My Profile
                                    </a>
                                </Link>
                                <Link href="">
                                    <a className="w-full flex justify-start items-center hover:text-sky-400 my-2">
                                        <BsBoxSeam className="text-xl mr-4" />
                                        My Orders
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}
                    <span className="relative cursor-pointer ml-2">
                        {selectCartProductSumQuantity > 0 && (
                            <div className="absolute top-[-0.75rem] right-[-1rem] w-5 h-5 rounded-full bg-sky-400 opacity-80 text-xs flex justify-center items-center">
                                {selectCartProductSumQuantity}
                            </div>
                        )}
                        <IoBagOutline
                            onClick={() => (cart.length > 0 ? setOpenListProducts((prev) => !prev) : false)}
                            className="text-xl"
                            // onMouseEnter={() => (cart.length > 0 ? setOpenListProducts(true) : false)}
                            // onMouseLeave={() => setOpenListProducts(false)}
                        />
                    </span>
                    {openListProducts && <ListItems setOpenListProducts={setOpenListProducts} />}
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
