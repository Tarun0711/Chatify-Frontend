import { createContext, useContext, useState } from "react";

const ConversationContext = createContext();

export const useConversationContext = ()=>{
    return useContext(ConversationContext);
}

export const ConversationContextProvider = ({children})=>{
    const [displayConversations, setDisplayConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    return <ConversationContext.Provider value={{ displayConversations, setDisplayConversations, selectedConversation, setSelectedConversation, messages, setMessages}}>
        {children}
    </ConversationContext.Provider>
}
