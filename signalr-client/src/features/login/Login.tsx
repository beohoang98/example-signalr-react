import {FC, FormEvent, useContext, useState} from "react";
import {AuthContext} from "../../core/auth/AuthContext";

export const LoginPage: FC = () => {
    const [username, setUsername] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        login(username);
    }

    return (
        <form action="#" onSubmit={handleSubmit}>
            <fieldset>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" value={username}
                           placeholder="Username"
                           onChange={ev => setUsername(ev.target.value)}/>
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </fieldset>
        </form>
    )
}
