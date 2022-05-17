import type { NextPage } from "next";
import { useState } from "react";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
// Components
import { Button, Form, Input } from "../Common";

// Types
import { TError } from "../../types";

interface IProps {
    user: {};
    isSignedIn: boolean;
    error: TError;
    confirmNewUser: (username: string, confirmationCode: string) => Promise<void>;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    clearErrorAuth: ActionCreatorWithoutPayload<string>;
}

const LoginForm: NextPage<IProps> = ({ user, isSignedIn, error, confirmNewUser, signIn, clearErrorAuth }) => {
    // Local States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");

    if (error.status === 400 && error.message === "UserNotConfirmedException") {
        return (
            <Form
                handleOnSubmit={(e) => {
                    e.preventDefault();
                    confirmNewUser(username, confirmationCode);
                    setConfirmationCode("");
                    setPassword("");
                    clearErrorAuth();
                }}
            >
                <div className="w-full my-2">
                    <Input
                        handleOnChange={(e) => setUsername(e.target.value)}
                        placeHolder="Username"
                        value={username}
                    />
                </div>
                <div className="w-full my-2">
                    <Input
                        handleOnChange={(e) => setConfirmationCode(e.target.value)}
                        placeHolder="Confirmation Code"
                        value={confirmationCode}
                    />
                </div>
                <div className="my-2">
                    <Button title="Confirm User" type="submit" />
                </div>
            </Form>
        );
    }

    return (
        <>
            {isSignedIn ? (
                <>
                    {/* @ts-ignore */}
                    <h1>Hi {user ? user.attributes.email : ""}</h1>
                </>
            ) : (
                <Form
                    handleOnSubmit={(e) => {
                        e.preventDefault();
                        signIn(username, password);
                    }}
                >
                    <div className="w-full my-2">
                        <Input
                            handleOnChange={(e) => setUsername(e.target.value)}
                            placeHolder="Username"
                            value={username}
                        />
                    </div>
                    <div className="w-full my-2">
                        <Input
                            handleOnChange={(e) => setPassword(e.target.value)}
                            placeHolder="Password"
                            value={password}
                            type="password"
                        />
                    </div>
                    <div className="my-2">
                        <Button title="Login" type="submit" />
                    </div>
                </Form>
            )}
        </>
    );
};

export default LoginForm;
