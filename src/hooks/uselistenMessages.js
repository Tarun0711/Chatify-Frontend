import { useEffect } from "react";
import { useConversationContext } from "../context/ConversationContextProvider";
import { useSocketContext } from "../context/SocketContext";
import useGetMessages from "./useGetMessages";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversationContext();
  const { getMessages } = useGetMessages();

  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleNewMessage = (newMessage) => {
      // Check if the message belongs to the current conversation
      if (selectedConversation._id === newMessage.receiverId._id || 
          selectedConversation._id === newMessage.senderId._id) {
        
        setMessages((prevMessages) => {
          // Check if message already exists
          const messageExists = prevMessages.some(msg => 
            msg._id === newMessage._id || 
            (msg.isTemp && msg.message === newMessage.message)
          );
          
          if (messageExists) return prevMessages;

          // If it's a temporary message, add it to the list
          if (newMessage.isTemp) {
            return [...prevMessages, newMessage];
          } else {
            // If it's a permanent message, replace any temporary message with the same content
            const withoutTemp = prevMessages.filter(msg => 
              !msg.isTemp || msg.message !== newMessage.message
            );
            return [...withoutTemp, newMessage];
          }
        });
      }
    };

    // Handle saved temporary messages
    const handleMessageSaved = (savedMessage) => {
      if (selectedConversation._id === savedMessage.receiverId._id || 
          selectedConversation._id === savedMessage.senderId._id) {
        setMessages((prevMessages) => {
          // Replace temporary message with saved message
          return prevMessages.map(msg => 
            msg._id === savedMessage._id || 
            (msg.isTemp && msg.message === savedMessage.message) 
              ? savedMessage 
              : msg
          );
        });
      }
    };

    // Set up message listeners
    socket.on("newMessage", handleNewMessage);
    socket.on("messageSaved", handleMessageSaved);

    // Fetch initial messages when conversation changes
    const fetchMessages = async () => {
      if (selectedConversation) {
        const fetchedMessages = await getMessages(selectedConversation._id);
        if (fetchedMessages) {
          setMessages(fetchedMessages);
        }
      }
    };

    fetchMessages();

    // Cleanup
    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageSaved", handleMessageSaved);
    };
  }, [socket, selectedConversation, setMessages, getMessages]);
};

export default useListenMessages;