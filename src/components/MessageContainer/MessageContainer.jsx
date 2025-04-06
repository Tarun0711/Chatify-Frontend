import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import { useConversationContext } from "../../context/ConversationContextProvider";
import useListenMessages from "../../hooks/uselistenMessages";

const MessageContainer = () => {
  const{selectedConversation, setSelectedConversation} = useConversationContext();
  
  // Initialize message listener
  useListenMessages();

  useEffect(()=>{
    return ()=> setSelectedConversation(null);
  }, [])

  const handleBack = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="md:w-[450px] lg:w-[600px] flex flex-col h-full bg-white shadow-lg">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="flex fixed top-0 left-0 right-0 z-10 items-center gap-3 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
            {/* Back button - visible only on mobile */}
            <button 
              onClick={handleBack}
              className="md:hidden mr-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              aria-label="Back to conversations"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={selectedConversation.profilePicture} 
                alt={`${selectedConversation.fullName}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-gray-800 truncate">{selectedConversation.fullName}</span>
          </div>
          <div className="flex-1 overflow-y-auto pt-16 pb-4 px-4">
            <Messages />
          </div>
          <div className="border-t border-gray-200 bg-white">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
