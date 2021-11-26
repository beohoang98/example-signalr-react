import {FC, useCallback, useMemo, useState} from "react";
import {AuthContext, AuthContextProps} from "./AuthContext";
import {LoginPage} from "../../features/login/Login";

export const AuthProvider: FC = ({children}) => {
    const [username, setUsername] = useState<string>();
    const [isLoading, setLoading] = useState(false);
    const isLogged = !!username;

    const login = useCallback(async (username: string) => {
        setLoading(true);
        await fetch(process.env.REACT_APP_API_URL + `/auth/login?name=${username}`, {
            method: "POST",
            credentials: "include",
        });
        setUsername(username);
        setLoading(false);
    }, []);
    const logout = useCallback(async () => {
        setLoading(true);
        await fetch(process.env.REACT_APP_API_URL + "/auth/logout", {
            method: "POST",
        });
        setUsername(undefined);
        setLoading(false);
    }, []);

    const context = useMemo<AuthContextProps>(() => ({
        isLogged,
        username,
        isLoading: false,
        login,
        logout,
    }), [isLogged, username, login, logout]);

    if (isLoading) {
        return <h1>Loading</h1>;
    }

    if (!isLogged) {
        return (
            <AuthContext.Provider value={context}>
                <LoginPage/>
            </AuthContext.Provider>
        );
    }

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
}
