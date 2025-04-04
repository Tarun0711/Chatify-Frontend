import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const logout = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("chat-user");
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
                method: "POST",
                headers: { 
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
            localStorage.removeItem("chat-user-data");
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout}
}

export default useLogout