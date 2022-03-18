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

const SignUpForm: NextPage<IProps> = ({}) => {
    // Local States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const signUp = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (password === repeatedPassword) {
                const { user } = await Auth.signUp({
                    username,
                    password,
                    // attributes: {
                    //     email,          // optional
                    //     phone_number,   // optional - E.164 number convention
                    //     // other custom attributes
                    // }
                });
                console.log(user);
            } else {
                console.log("Password and Reapted Password are not equals");
            }
        } catch (error) {
            console.log("error signing up:", { error });
        }
    };

    return (
        <Form handleOnSubmit={signUp}>
            <Input handleOnChange={(e) => setUsername(e.target.value)} placeHolder="Username" value={username} />
            <Input
                handleOnChange={(e) => setPassword(e.target.value)}
                placeHolder="Password"
                value={password}
                type="password"
            />
            <Input
                handleOnChange={(e) => setRepeatedPassword(e.target.value)}
                placeHolder="Repeat Password"
                value={repeatedPassword}
                type="password"
            />
            <Button title="SignUp" type="submit" />
        </Form>
    );
};

export default SignUpForm;
