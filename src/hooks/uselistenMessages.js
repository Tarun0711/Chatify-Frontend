import { useEffect } from "react";
import { useConversationContext } from "../context/ConversationContextProvider";
import { useSocketContext } from "../context/SocketContext"


const uselistenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversationContext();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);
        })

        return () => socket?.off("newMessage");

    }, [socket, setMessages, messages])


}

export default uselistenMessages