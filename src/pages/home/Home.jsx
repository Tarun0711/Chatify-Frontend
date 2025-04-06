import MessageContainer from "../../components/MessageContainer/MessageContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useConversationContext } from "../../context/ConversationContextProvider";

const Home = () => {
  const { selectedConversation } = useConversationContext();

  return (
    <section className="flex flex-col md:flex-row h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] rounded-lg bg-white shadow-lg overflow-hidden">
      {/* Sidebar - hidden on mobile when a conversation is selected */}
      <div className={`w-full md:w-[350px] lg:w-[400px] h-full ${selectedConversation ? 'hidden md:block' : 'block'}`}>
        <Sidebar/>
      </div>
      
      {/* Message Container - full width on mobile when a conversation is selected */}
      <div className={`flex-1 h-full ${selectedConversation ? 'block' : 'hidden md:block'}`}>
        <MessageContainer/>
      </div>
    </section>
  );
};

export default Home;
