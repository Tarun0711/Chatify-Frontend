import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useConversationContext } from "../context/ConversationContextProvider";


const useGetConversations = () => {

    const{setDisplayConversations} = useConversationContext();

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(()=>{
        const getConversations = async ()=>{
            setLoading(true);
            try{
                const token = localStorage.getItem("chat-token");
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                // const res = await fetch(`/api/users`);
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data);
                setDisplayConversations(data);
            } catch(error){
                toast.error(error.message);
            } finally{
                setLoading(false);
            }
        }
        getConversations();
    }, [])

    return {loading, conversations};
}

export default useGetConversations