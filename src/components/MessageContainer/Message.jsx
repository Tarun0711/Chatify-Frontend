import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from "../../context/ConversationContextProvider";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end":"chat-start";
  const profilePicture = fromMe
  ? authUser.profilePicture
  : selectedConversation.profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300";
  const shakeClass = message.shouldShake ? "shake" :"";

  const formattedTime = extractTime(message.createdAt)

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="avatar"
            src={profilePicture}
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-slate-900 ${bubbleBgColor} ${shakeClass}`}
      >
        {message.message}
      </div>
      <div className="chat-footer">
        <time className="text-xs opacity-50">{formattedTime}</time>
      </div>
    </div>
  );
};

export default Message;


function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

function padZero(number) {
	return number.toString().padStart(2, "0");
}