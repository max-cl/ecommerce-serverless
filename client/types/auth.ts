type TError = { status: number; message: string };

interface IUser {
    user: {};
    isSignedIn?: boolean;
    errorAuth: TError;
    // signIn: (username: string, password: string) => Promise<void>;
    // signOut: () => Promise<void>;
    // confirmNewUser: (username: string, confirmationCode: string) => Promise<void>;
    // signUp: (username: string, password: string, repeatedPassword: string) => Promise<void>;
    token?: string;
}

export type { IUser, TError };
