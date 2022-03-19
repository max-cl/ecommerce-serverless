import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

// Components
import { Button } from "../../components/Common";
import NavBar from "../../components/Navbar";
import SignUpForm from "../../components/SignUpForm";

// Context
import { userContext } from "../../context";

const SignUp: NextPage = () => {
    // Router
    const router = useRouter();
    // Context
    const { signUp } = useContext(userContext);

    return (
        <section id="signup" className="h-screen">
            <NavBar isLogo={true} />
            <div className="w-full pt-24 flex justify-center items-center">
                <Button title="Login" handleOnclick={() => router.push("/login")} customCss="rounded-r-none py-4" />
                <Button title="SignUp" disabled={true} customCss="rounded-l-none py-4" />
            </div>
            <div className="w-full pt-24 px-96">
                <SignUpForm signUp={signUp} />
            </div>
        </section>
    );
};

export default SignUp;
