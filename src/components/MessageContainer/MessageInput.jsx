import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
const MessageInput = () => {
  const { loading, sentMessage } = useSendMessage();

  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    await sentMessage(message);
    setMessage("");
  };
  return (
    <form
      className="px-4 my-3 flex gap-2 justify-between items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-100 border-gray text-gray-800 focus:outline-gray-500"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="flex items-center h-full">
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <BsSend className="h-5 w-5" />
        )}
      </button>
    </form>
  );
};

export default MessageInput;
