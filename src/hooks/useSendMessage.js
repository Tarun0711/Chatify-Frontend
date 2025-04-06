import { useState } from "react"
import { useConversationContext } from '../context/ConversationContextProvider'
import { useSocketContext } from '../context/SocketContext'
import { useAuthContext } from '../context/AuthContext'
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversationContext();
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();

  const sentMessage = async (message) => {
    if (!selectedConversation) {
      toast.error("No conversation selected");
      return;
    }

    if (!authUser) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      // Create a temporary message ID
      const tempMessageId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // First emit the socket event to ensure real-time delivery
      if (socket) {
        const tempMessage = {
          _id: tempMessageId,
          senderId: authUser._id,
          receiverId: selectedConversation._id,
          message: message,
          createdAt: new Date(),
          isTemp: true,
          // Add user details for real-time display
          senderName: authUser.fullName,
          senderProfilePicture: authUser.profilePicture,
          receiverName: selectedConversation.fullName,
          receiverProfilePicture: selectedConversation.profilePicture
        };
        
        // Update UI immediately with temporary message
        setMessages((prevMessages) => {
          // Check if message already exists
          const messageExists = prevMessages.some(msg => 
            msg._id === tempMessageId || 
            (msg.isTemp && msg.message === message)
          );
          
          if (messageExists) return prevMessages;
          
          return [...prevMessages, tempMessage];
        });
        
        // Emit socket event
        socket.emit("sendMessage", {
          message: tempMessage,
          receiverId: selectedConversation._id
        });
      }

      // Then send to backend
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${authUser.token}`
        },
        body: JSON.stringify({ message })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Replace temporary message with actual message from database
      setMessages((prevMessages) => {
        return prevMessages.map(msg => 
          msg._id === tempMessageId || 
          (msg.isTemp && msg.message === message)
            ? data
            : msg
        );
      });

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.message);
      // Remove temporary message if there was an error
      setMessages((prevMessages) => 
        prevMessages.filter(msg => 
          !msg.isTemp || msg.message !== message
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return { sentMessage, loading };
}

export default useSendMessage;