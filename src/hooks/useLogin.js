import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useLogin = () => {

    const { setAuthUser } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const login = async (userName, password) => {
        const success = handleInputError(userName, password);
        if (!success) return;


        setLoading(true);
        try {
            // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
            const res = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ userName, password })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login }
}

export default useLogin;


function handleInputError(userName, password) {
    if (!userName || !password) {
        toast.error("Please fill in all the fields")
        return false;
    }

    return true;
}