import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const{authUser}=useAuthContext();
  return (
    <div className="mt-auto py-1 px-2 flex gap-4 items-center border-t border-gray-800 bg-gray-200">
      {!loading ? (
        <BiLogOut className="w-6 h-6 cursor-pointer" onClick={logout} />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      <div className="flex items-center gap-2">
        <img src={authUser.profilePicture} alt="avatar" className="w-9 rounded-full"/>
        <span className="font-semibold text-gray-600">{authUser.fullName}</span>
      </div>
    </div>
  );
};

export default LogoutButton;
