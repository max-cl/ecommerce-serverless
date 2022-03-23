import type { NextPage } from "next";
import { useRouter } from "next/router";

// Components
import { Button } from "../../components/Common";
import NavBar from "../../components/Navbar";
import SignUpForm from "../../components/SignUpForm";

// Custom Hooks
import useAuth from "../../hooks/useAuth";

const SignUp: NextPage = () => {
    // Router
    const router = useRouter();
    // Custom Hooks useAuth (AWS Cognito)
    const { signUp } = useAuth({
        options: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
            userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID,
            region: process.env.NEXT_PUBLIC_AWS_REGION,
        },
    });

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
