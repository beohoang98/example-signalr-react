import {FC, FormEvent, useCallback, useContext, useState} from "react";
import {SignalRContext} from "../../../core/signalr/SignalRContext";

interface ChatInputProps {
    className?: string;
}

export const ChatInput: FC<ChatInputProps> = ({ className }) => {
    const { hub } = useContext(SignalRContext);
    const [msg, setMsg] = useState("");

    const handleSendMessage = useCallback(async (ev: FormEvent) => {
        ev.preventDefault();
        await hub.invoke("message", msg);
        setMsg("");
    }, [hub, msg]);

    return (
        <div className={className}>
            <form onSubmit={handleSendMessage}>
                <input type="text" value={msg} onChange={ev => setMsg(ev.target.value)}/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
