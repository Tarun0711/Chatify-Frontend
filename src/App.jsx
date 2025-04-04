import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center bg-base-200">
      <div>
        <Toaster />
      </div>

      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to="/login" replace={true}/>} />
        <Route path="/login" element={authUser ? <Navigate to="/" replace={true}/> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" repalce={true}/> : <Signup />} />
      </Routes>
    </div>
  );
};

export default App;
