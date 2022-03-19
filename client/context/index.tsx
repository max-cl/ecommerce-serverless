import React from "react";

interface IUserContext {
    user: {};
    isSignedIn: boolean;
    error: string;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    confirmNewUser: (username: string, confirmationCode: string) => Promise<void>;
    signUp: (username: string, password: string, repeatedPassword: string) => Promise<void>;
}

export const userContext = React.createContext<IUserContext>({} as any);
