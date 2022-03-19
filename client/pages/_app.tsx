import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import React from "react";

// Custom Hooks
import useAuth from "../hooks/useAuth";

// Context
import { userContext } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
    // Custom Hooks Auth AWS Cognito
    // const { signIn, signOut, confirmNewUser, signUp, error } = useAuth({
    const auth = useAuth({
        options: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
            userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID,
            region: process.env.NEXT_PUBLIC_AWS_REGION,
        },
    });
    return (
        <Provider store={store}>
            <userContext.Provider value={auth}>
                <Component {...pageProps} />
            </userContext.Provider>
        </Provider>
    );
}

export default MyApp;
