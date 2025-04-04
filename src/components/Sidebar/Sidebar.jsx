import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import Searchinput from "./Searchinput";

const Sidebar = () => {
  return <section className="flex flex-col p-1 border-r border-slate-500">
    <Searchinput/>
    <div className="divider m-0" /> 
    <Conversations/>

    <LogoutButton/>
  </section>;
};

export default Sidebar;
