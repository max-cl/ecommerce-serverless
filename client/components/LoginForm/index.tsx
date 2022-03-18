import { NextPage } from "next";
import Amplify, { Auth } from "aws-amplify";

// Components
import { Button, Form, Input } from "../Common";
import { useState } from "react";

// AWS-Cognito (AWS-Amplify-Library) Configuration
Amplify.configure({
    Auth: {
        region: process.env.NEXT_PUBLIC_AWS_REGION, //(User pools > General Settings > Pool Id) The first part of the Pool Id us-east-1
        userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID, // (User pools > General Settings > Pool Id)
        userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID, //(User pools > General Settings > App clients > App client id)
        // identityPoolId: "869158544386", // (Federated Identities > Selected Identity Pool/Create new > Sample code > Select Javascript > Get AWS Credentials), If we want to Login with AWS. Facebook, Google, etc.. accounts
    },
    // API: {
    //     endpoints: process.env.PRODUCTS_API_ENDPOINT,
    // },
});

interface IProps {}

const LoginForm: NextPage<IProps> = ({}) => {
    // Local States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");

    const login = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const user = await Auth.signIn(username, password);
            // console.log({ user });
            setCurrentUser(user);
        } catch (error) {
            console.log("error Login", { error });

            // @ts-ignore
            setError(error ? error.code : "");
        }
    };

    const logout = async () => {
        try {
            await Auth.signOut();
            // await Auth.signOut({ global: true }); //you sign out users from all devices
            setCurrentUser({});
            setPassword("");
            console.log("Logout");
        } catch (error) {
            console.log("error signing out: ", { error });
        }
    };

    const confirmSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await Auth.confirmSignUp(username, confirmationCode);
            setConfirmationCode("");
            setError("");
        } catch (error) {
            console.log("error confirming sign up", { error });
        }
    };

    console.log({ currentUser: Object.keys(currentUser).length > 0 ? "yes" : "no" });

    if (error === "UserNotConfirmedException") {
        return (
            <Form handleOnSubmit={confirmSignUp}>
                <Input handleOnChange={(e) => setUsername(e.target.value)} placeHolder="Username" value={username} />
                <Input
                    handleOnChange={(e) => setConfirmationCode(e.target.value)}
                    placeHolder="Confirmation Code"
                    value={confirmationCode}
                />
                <Button title="Confirm User" type="submit" />
            </Form>
        );
    }

    return (
        <>
            {Object.keys(currentUser).length === 0 ? (
                <Form handleOnSubmit={login}>
                    <Input
                        handleOnChange={(e) => setUsername(e.target.value)}
                        placeHolder="Username"
                        value={username}
                    />
                    <Input
                        handleOnChange={(e) => setPassword(e.target.value)}
                        placeHolder="Password"
                        value={password}
                        type="password"
                    />
                    <Button title="Login" type="submit" />
                </Form>
            ) : (
                <>
                    <h1>Hi {username}</h1>
                    <Button title="Logout" handleOnclick={logout} />
                </>
            )}
        </>
    );
};

export default LoginForm;
