import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import { useConversationContext } from "../../context/ConversationContextProvider";


const MessageContainer = () => {
  const{selectedConversation, setSelectedConversation} = useConversationContext();

  useEffect(()=>{
    return ()=> setSelectedConversation(null);
  }, [])

  return (
    <div className="md:w-[450px] lg:w-[600px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="flex items-center gap-2 bg-gray-300 px-4 py-2 cursor-default">
          <div className="w-[3rem] rounded-full">
            <img src={selectedConversation.profilePicture} 
            alt="avatar"/>
          </div>
            <span className="font-semibold text-gray-600">{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
