import {FC} from "react";
import classes from "./ChatMessage.module.css";

interface ChatEventProps {
    message: string;
}

export const ChatEvent: FC<ChatEventProps> = ({message}) => {
    return (
        <div className={classes.event}>{message}</div>
    )
}
