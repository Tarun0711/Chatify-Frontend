import { useState } from "react"
import { useConversationContext } from '../context/ConversationContextProvider'
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversationContext();

  const sentMessage = async (message) => {
    setLoading(true);
    try {
      // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${selectedConversation._id}`, {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ message })
      })
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { sentMessage, loading };

}

export default useSendMessage