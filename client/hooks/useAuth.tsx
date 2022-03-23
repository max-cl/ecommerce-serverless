import { useEffect, useMemo } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

// Redux
import { useAppDispatch } from "./redux";

// Store
import { login, logout, authenticatedUser } from "../redux/states/auth";

// Types
import { IAWSOptions } from "../types";

export default ({ options }: IAWSOptions) => {
    // Router
    const router = useRouter();
    // Redux
    const dispatch = useAppDispatch();

    const auth = useMemo(() => {
        Auth.configure(options);
        return Auth;
    }, []);

    useEffect(() => {
        auth.currentAuthenticatedUser()
            .then((user) => {
                const token = user.signInUserSession.idToken.jwtToken;
                dispatch(authenticatedUser({ user, token, errorAuth: { status: 0, message: "" } }));
            })
            .catch((error) => {
                console.log({ error: `currentAuthenticatedUser: ${error}` });
            });
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const user = await auth.signIn(username, password);
            const token = user.signInUserSession.idToken.jwtToken;
            dispatch(login({ user, token, errorAuth: { status: 0, message: "" } }));
            router.push("/");
        } catch (error) {
            console.log({ error: `signIn: ${error}` });
        }
    };

    const signOut = async () => {
        try {
            // await auth.signOut();
            await auth.signOut({ global: true });
            console.log("signOut useAuth");
            dispatch(logout());
        } catch (error) {
            console.log({ error: `signOut: ${error}` });
        }
    };

    const confirmNewUser = async (username: string, confirmationCode: string) => {
        try {
            await auth.confirmSignUp(username, confirmationCode);
        } catch (error) {
            console.log({ error: `confirmSignUp: ${error}` });
        }
    };

    const signUp = async (username: string, password: string, repeatedPassword: string) => {
        try {
            if (password === repeatedPassword) {
                await auth.signUp({ username, password });
                router.push("/login");
            } else {
                console.log({ error: `signUp: Password and Reapted Password are not equals` });
            }
        } catch (error) {
            console.log({ error: `signUp: ${error}` });
        }
    };

    return {
        signIn,
        signOut,
        confirmNewUser,
        signUp,
    };
};
