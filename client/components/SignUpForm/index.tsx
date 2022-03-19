import type { NextPage } from "next";
import { useState } from "react";

// Components
import { Button, Form, Input } from "../Common";

interface IProps {
    signUp: (username: string, password: string, repeatedPassword: string) => Promise<void>;
}

const SignUpForm: NextPage<IProps> = ({ signUp }) => {
    // Local States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    return (
        <Form
            handleOnSubmit={(e) => {
                e.preventDefault();
                signUp(username, password, repeatedPassword);
            }}
        >
            <div className="w-full my-2">
                <Input handleOnChange={(e) => setUsername(e.target.value)} placeHolder="Username" value={username} />
            </div>
            <div className="w-full my-2">
                <Input
                    handleOnChange={(e) => setPassword(e.target.value)}
                    placeHolder="Password"
                    value={password}
                    type="password"
                />
            </div>
            <div className="w-full my-2">
                <Input
                    handleOnChange={(e) => setRepeatedPassword(e.target.value)}
                    placeHolder="Repeat Password"
                    value={repeatedPassword}
                    type="password"
                />
            </div>
            <div className="my-2">
                <Button title="SignUp" type="submit" />
            </div>
        </Form>
    );
};

export default SignUpForm;
