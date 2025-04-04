import { useEffect, useState } from "react"
import { useConversationContext } from "../context/ConversationContextProvider";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversationContext();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem("chat-token");
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/getMessages/${selectedConversation._id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        }
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages])

    return { messages, loading };
}

export default useGetMessages