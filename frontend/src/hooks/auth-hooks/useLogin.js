import { useState } from "react";
import { useAuthContext } from "../../context/auth-context";
import * as z from "zod";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.email("invalid email"),
  password: z.string().min(6, "Password must be 6 characters"),
});

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      const result = loginSchema.safeParse({ email, password });

      if (!result.success) {
        const message = result.error.issues[0].message;
        throw new Error(message);
      }

      const res = await fetch("/api/auth/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        throw new Error("Internal Server Error");
      }

      const { success, message, data: user } = await res.json();

      if (!success) {
        throw new Error(message);
      }

      localStorage.setItem("user", JSON.stringify(user));
      setAuthUser(user);
      toast.success("Login Successfull !");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
