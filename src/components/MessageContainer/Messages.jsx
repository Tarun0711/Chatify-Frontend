import { useRef, useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import uselistenMessages from "../../hooks/uselistenMessages";
import { useAuthContext } from "../../context/AuthContext";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const { authUser } = useAuthContext();

  uselistenMessages();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sort messages by creation time and remove duplicates
  const sortedMessages = [...messages]
    .filter((message, index, self) => 
      index === self.findIndex((m) => 
        m._id === message._id || 
        (m.isTemp && m.message === message.message)
      )
    )
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div className="px-4 py-1 flex-1 overflow-y-auto overflow-x-hidden">
      {!loading && sortedMessages.length > 0 && (
        <div className="flex flex-col gap-2">
          {sortedMessages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        </div>
      )}
      <div ref={messagesEndRef} />

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && sortedMessages.length === 0 && (
        <p className="text-center text-gray-600">
          Send a message to start a conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
