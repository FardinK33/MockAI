import { useState } from "react";
import { useAuthContext } from "../../context/auth-context";
import toast from "react-hot-toast";
import * as z from "zod";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ name, email, password, confirmPassword }) => {
    try {
      setLoading(true);
      const result = signupSchema.safeParse({
        name,
        email,
        password,
        confirmPassword,
      });

      if (!result.success) {
        const message = result.error.issues[0].message; // showing the first error
        throw new Error(message);
      }

      const res = await fetch(
        "https://mockai-i25k.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(result.data),
        }
      );

      if (!res.ok) {
        throw new Error("Internal Server Error");
      }

      const { success: isSuccess, message, data: user } = await res.json();

      if (!isSuccess) {
        throw new Error(message);
      }

      setSuccess(true);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthUser(user);
      toast.success("Sign-up Successfull !");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup, success };
};

export default useSignup;
