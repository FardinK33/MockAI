import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import useSignup from "../../hooks/auth-hooks/useSignup";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [user, setUser] = useState(initialState);
  const { loading, signup, success } = useSignup();

  const handleChange = (e) => {
    const name = e.target.name;
    setUser((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(user);
    if (success) setUser(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto">
      <Input
        name="name"
        label="Name"
        type="text"
        placeholder="Full Name"
        value={user.name}
        className="border-white/30 placeholder:text-off-white/50"
        onChange={handleChange}
      />
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="email"
        value={user.email}
        className="border-white/30 placeholder:text-off-white/50"
        onChange={handleChange}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="******"
        value={user.password}
        className="border-white/30 placeholder:text-off-white/50"
        onChange={handleChange}
      />
      <Input
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="******"
        value={user.confirmPassword}
        className="border-white/30 placeholder:text-off-white/50"
        onChange={handleChange}
      />

      <Button
        disabled={loading}
        className={`rounded-lg bg-accent active:bg-accent/80 text-white w-full mt-4 h-8 focus:outline-white ${loading && "animate-pulse"}`}
        type="submit"
      >
        {loading ? "Signing up..." : "Signup"}
      </Button>
    </form>
  );
};

export default SignupForm;
