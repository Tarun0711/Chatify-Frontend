import { useRef, useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import uselistenMessages from "../../hooks/uselistenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();

  uselistenMessages();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  return (
    <div className="px-4 py-1 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      <div ref={messagesEndRef} />

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-600">
          Send a message to start a conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
