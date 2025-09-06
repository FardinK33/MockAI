import { useState } from "react";
import { useAuthContext } from "../../context/auth-context";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://mockai-i25k.onrender.com/api/auth/logout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Internal Server Error");
      }

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      setAuthUser(null);
      localStorage.removeItem("user");
      toast.success("Logout Successfull !");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
