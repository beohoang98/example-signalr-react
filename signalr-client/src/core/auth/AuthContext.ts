import {createContext} from "react";

export type AuthContextProps = {
    isLogged: boolean;
    username?: string;
    isLoading: boolean;
    logout: CallableFunction;
    login: (username: string) => Promise<any>;
}

export const AuthContext = createContext<AuthContextProps>(null as any);
