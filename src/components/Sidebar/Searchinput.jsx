import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useConversationContext } from "../../context/ConversationContextProvider";
import useGetConversations from '../../hooks/useGetConversations'
import toast from "react-hot-toast";

const Searchinput = () => {

  const{displayConversations, setDisplayConversations} = useConversationContext();
  const{conversations} = useGetConversations();

  const [search, setSearch] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!search){
      setDisplayConversations(conversations);
      return;
    }
    
    const filteredConversations = conversations.filter(conversation => conversation.fullName.toLowerCase().includes(search));
    setDisplayConversations(filteredConversations);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 py-2 px-3 items-center">
      <input
        type="text"
        placeholder="Search..."
        className="w-[15rem] border text-md rounded-lg block p-2.5 bg-gray-100 border-gray text-gray-800 focus:outline-gray-500"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle">
        <IoSearch className="h-full w-full p-3" />
      </button>
    </form>
  );
};

export default Searchinput;
