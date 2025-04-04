import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children})=>{
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    return <AuthContext.Provider value={{authUser, setAuthUser, selectedConversation, setSelectedConversation, messages, setMessages}}>
        {children}
    </AuthContext.Provider>
}
