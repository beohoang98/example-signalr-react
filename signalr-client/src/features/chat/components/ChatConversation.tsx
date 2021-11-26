import {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../../core/auth/AuthContext";
import {SignalRContext} from "../../../core/signalr/SignalRContext";
import {ChatMessage} from "./ChatMessage";
import {ChatEvent} from "./ChatEvent";

interface ChatConversationProps {
    className?: string;
}

interface MessageProps {
    user: string;
    message: string;
    type: "chat" | "event";
    ts: number;
}

export const ChatConversation: FC<ChatConversationProps> = ({className}) => {
    const {username} = useContext(AuthContext);
    const {hub} = useContext(SignalRContext);

    const ref = useRef<MessageProps[]>([]);
    const [, forceUpdate] = useState(Date.now());

    const handleNewMessage = useCallback((user, message) => {
        ref.current.push({
            user,
            message,
            type: "chat",
            ts: Date.now()
        });
        forceUpdate(Date.now());
    }, []);

    const handleEvent = useCallback((evName: string) => (user: string) => {
        ref.current.push({
            user,
            message: evName,
            type: "event",
            ts: Date.now()
        })
        forceUpdate(Date.now());
    }, []);

    useEffect(() => {
        hub.on("receiveMessage", handleNewMessage);
        return () => {
            hub.off("message");
        }
    }, [hub, handleNewMessage]);

    useEffect(() => {
        hub.on("joined", handleEvent("joined"));
        hub.on("left", handleEvent("left"));
        return () => {
            hub.off("joined");
            hub.off("left");
        }
    }, [hub, handleEvent]);

    return (
        <div className={className}>
            {ref.current.map((msg) => msg.type === "chat" ? (
                <ChatMessage key={msg.ts}
                             username={msg.user}
                             message={msg.message}
                             isMine={msg.user === username}/>
            ) : (
                <ChatEvent key={msg.ts}
                           message={msg.user + " has " + msg.message}/>
            ))}
        </div>
    )
}
