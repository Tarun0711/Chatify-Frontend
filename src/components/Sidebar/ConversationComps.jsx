import { useConversationContext } from "../../context/ConversationContextProvider";
import { useSocketContext } from "../../context/SocketContext";

const ConversationComps = ({conversation, lastIndex}) => {
  const{selectedConversation, setSelectedConversation} = useConversationContext();

  const{onlineUsers} = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;

  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div className={`flex gap-3 items-center hover:bg-gray-300 rounded px-2 py-1 transition-all cursor-pointer mr-1 border-b border-gray-300 ${lastIndex ? 'border-none' : ''} ${isSelected ? 'bg-gray-300' : ''}`} onClick={()=>setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-[3rem] rounded-full">
            <img src={conversation.profilePicture} 
            alt="avatar"/>
          </div>
        </div>
        <div className="flex flex-col flex-1">
            <p className="font-semibold text-gray-600">{conversation.fullName}</p>
        </div>
      </div>
    </>
  );
};

export default ConversationComps;
