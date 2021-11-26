import {HubConnection} from "@microsoft/signalr";
import {createContext} from "react";

export interface SignalRContextProps {
    hub: HubConnection;
}

export const SignalRContext = createContext<SignalRContextProps>({} as any);
