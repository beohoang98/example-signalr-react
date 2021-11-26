import {FC} from "react";
import {ChatConversation} from "./components/ChatConversation";
import {ChatInput} from "./components/ChatInput";

import classes from "./Chat.module.css";

export const ChatPage: FC = () => {
    return (
        <div className={classes.chat_wrapper}>
            <ChatConversation className={classes.chat_conversation} />
            <ChatInput className={classes.chat_input_wrapper}/>
        </div>
    )
}
