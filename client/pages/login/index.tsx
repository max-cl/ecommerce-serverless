import type { NextPage } from "next";
import { useRouter } from "next/router";

// Components
import { Button } from "../../components/Common";
import LoginForm from "../../components/LoginForm";
import NavBar from "../../components/Navbar";
import { useAppSelector } from "../../hooks/redux";

// Custom Hooks
import useAuth from "../../hooks/useAuth";

const Login: NextPage = () => {
    // Router
    const router = useRouter();
    // Custom Hooks useAuth (AWS Cognito)
    const { signIn, signOut, confirmNewUser } = useAuth({
        options: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
            userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID,
            region: process.env.NEXT_PUBLIC_AWS_REGION,
        },
    });

    const { user, isSignedIn, errorAuth } = useAppSelector((state) => state.auth);

    return (
        <section id="login" className="h-screen">
            <NavBar isLogo={true} />
            {!isSignedIn && (
                <div className="w-full pt-24 flex justify-center items-center ">
                    <Button title="Login" disabled={true} customCss="rounded-r-none py-4" />
                    <Button
                        title="SignUp"
                        handleOnclick={() => router.push("/signup")}
                        customCss="rounded-l-none py-4"
                    />
                </div>
            )}
            <div className="w-full pt-24 px-96">
                <LoginForm
                    signIn={signIn}
                    signOut={signOut}
                    confirmNewUser={confirmNewUser}
                    error={errorAuth.message}
                    user={user}
                    isSignedIn={isSignedIn !== undefined && isSignedIn}
                />
            </div>
        </section>
    );
};

export default Login;
