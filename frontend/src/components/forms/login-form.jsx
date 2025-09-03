import { useState } from "react";
import { Button, Input } from "../index";
import useLogin from "../../hooks/auth-hooks/useLogin";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [user, setUser] = useState(initialState);
  const { loading, login } = useLogin();

  const handleChange = (e) => {
    const name = e.target.name;
    setUser((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(user);
    setUser(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="password"
        value={user.password}
        className="border-white/30 placeholder:text-off-white/50"
        onChange={handleChange}
      />

      <Button
        className={`rounded-lg bg-accent active:bg-accent/80 text-white w-full mt-4 h-8 focus:outline-white"
        type="submit`}
        disabled={loading}
        type="submit"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
