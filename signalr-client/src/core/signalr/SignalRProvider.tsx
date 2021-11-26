import {FC, useEffect, useMemo} from "react";
import {SignalRContext, SignalRContextProps} from "./SignalRContext"
import {HubConnectionBuilder} from "@microsoft/signalr";

export const SignalRProvider: FC = ({children}) => {
    const context = useMemo<SignalRContextProps>(() => ({
        hub: new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_API_URL}/chat`)
            .withAutomaticReconnect()
            .build(),
    }), []);

    useEffect(() => {
        context.hub
            .start()
            .then(() => context.hub.invoke("joined"));
        window.addEventListener("beforeunload", () => {
            context.hub
                .invoke("left")
                .then(() => context.hub.stop());
        });
        return () => {
            window.onbeforeunload = null;
            context.hub.stop();
        }
    }, [context.hub]);

    return (
        <SignalRContext.Provider value={context}>
            {children}
        </SignalRContext.Provider>
    )
}
