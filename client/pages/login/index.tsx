import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useContext } from "react";

// Components
import { Button } from "../../components/Common";
import LoginForm from "../../components/LoginForm";
import NavBar from "../../components/Navbar";

// Context
import { userContext } from "../../context";

const Login: NextPage = () => {
    // Router
    const router = useRouter();
    // Context
    const { user, isSignedIn, error, signIn, signOut, confirmNewUser, signUp } = useContext(userContext);

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
                    error={error}
                    user={user}
                    isSignedIn={isSignedIn}
                />
            </div>
        </section>
    );
};

export default Login;
