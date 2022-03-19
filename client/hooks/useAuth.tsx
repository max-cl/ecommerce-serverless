import { useState, useEffect, useMemo } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

//@ts-ignore
export default ({ options }) => {
    // Router
    const router = useRouter();
    // Local State
    const [state, setState] = useState({
        user: {},
        isSignedIn: false,
        error: "",
    });

    const auth = useMemo(() => {
        Auth.configure(options);
        return Auth;
    }, []);

    useEffect(() => {
        auth.currentAuthenticatedUser()
            .then((user) => {
                setState({ user, isSignedIn: true, error: "" });
            })
            .catch((error) => {
                setState({ ...state, error });
            });
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const user = await auth.signIn(username, password);
            setState({ user, isSignedIn: true, error: "" });
            console.log("signIn useAuth: ", { username, password, user });
            router.push("/");
        } catch (error) {
            console.log("error Login", { error });
            //@ts-ignore
            setState({ user: {}, isSignedIn: false, error: error.name as string });
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
            console.log("signOut useAuth");
            // Auth.signOut({ global: true });
            setState({ user: {}, isSignedIn: false, error: "" });
        } catch (error) {
            console.log("error signing out: ", { error });
            //@ts-ignore
            setState({ user: {}, isSignedIn: false, error: error.name as string });
        }
    };

    const confirmNewUser = async (username: string, confirmationCode: string) => {
        try {
            await auth.confirmSignUp(username, confirmationCode);
            setState({ user: {}, isSignedIn: false, error: "" });
        } catch (error) {
            console.log("error confirming sign up", { error });
            //@ts-ignore
            setState({ user: {}, isSignedIn: false, error: error.name as string });
        }
    };

    const signUp = async (username: string, password: string, repeatedPassword: string) => {
        try {
            if (password === repeatedPassword) {
                await auth.signUp({
                    username,
                    password,
                });
                setState({ user: {}, isSignedIn: false, error: "" });
                console.log("signUp useAuth: ", { username, password });
                router.push("/login");
            } else {
                console.log("Password and Reapted Password are not equals");
                setState({ ...state, error: "Password and Reapted Password are not equals" });
            }
        } catch (error) {
            console.log("error confirming sign up", { error });
            //@ts-ignore
            setState({ user: {}, isSignedIn: false, error: error.name as string });
        }
    };

    return {
        ...state,
        signIn,
        signOut,
        confirmNewUser,
        signUp,
    };
};
