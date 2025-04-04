import { useConversationContext } from "../../context/ConversationContextProvider";
import useGetConversations from "../../hooks/useGetConversations";
import ConversationComps from "./ConversationComps";

const Conversations = () => {
  const { loading } = useGetConversations();
  const{displayConversations} = useConversationContext();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {displayConversations.map((conversation, idx) => (
        <ConversationComps key={conversation._id}
        conversation={conversation} lastIndex={idx === displayConversations.length - 1}/>
      ))}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};

export default Conversations;
