import {FC} from "react";

import classes from "./ChatMessage.module.css";

interface ChatMessageProps {
    username: string;
    isMine?: boolean;
    message: string;
}

export const ChatMessage: FC<ChatMessageProps> = ({
    username,
    isMine = false,
    message
}) => {
    const classDirection = isMine ? classes.is_mine : "";

    return (
        <div className={classes.wrapper + " " + classDirection}>
            <div className={classes.name}>{username}</div>
            <div className={classes.message}>{message}</div>
        </div>
    )
}
