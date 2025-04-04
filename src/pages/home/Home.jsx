import MessageContainer from "../../components/MessageContainer/MessageContainer";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  return <section className="flex h-[450px] md:h-[550px] rounded-lg bg-white shadow-lg overflow-hidden">
    <Sidebar/>
    <MessageContainer/>
  </section>
};

export default Home;
