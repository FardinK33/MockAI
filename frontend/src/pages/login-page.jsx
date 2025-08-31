import { useState } from "react";
import bgImage from "../assets/wave-bg.jpg";
import { RiRobot3Line } from "react-icons/ri";
import { Button, Input } from "../components";

const LoginPage = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    setUser((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="h-screen bg-cover p-4 md:p-10 w-full"
    >
      <div className="h-full max-w-4xl mx-auto overflow-hidden grid grid-cols-1 md:grid-cols-2 rounded-2xl text-whitesmoke">
        {/* Left Side (hidden on mobile) */}
        <div className="hidden md:flex h-full bg-purple-900/20 border-2 border-white/50 rounded-l-2xl items-end p-6 border-r-0">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-cabinet-grotesk tracking-tight mb-4">
              Prepare Smarter, Perform Better
            </h1>
            <p className="text-lg md:text-xl font-general-sans text-gray-300">
              AI that prepares you to ace Interviews – faster, smarter, and with
              greater confidence.
            </p>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="relative flex flex-col justify-around p-6 sm:p-8 md:border-2 border-white/50 rounded-2xl md:rounded-l-none overflow-hidden bg-black/80 md:bg-black/90">
          {/* Radial Gradient Background */}
          <div class="absolute inset-0 hidden">
            <div class="absolute inset-0 z-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
          </div>

          {/* Content */}
          <div className="z-10 relative">
            <div className="text-5xl p-2 rounded-full flex justify-center">
              <RiRobot3Line />
            </div>
            <div className="mt-6 mx-auto w-full max-w-xs sm:max-w-sm">
              <p className="text-2xl sm:text-3xl font-general-sans font-medium text-center mb-4">
                Welcome Back
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="username"
                  label="Email"
                  type="text"
                  placeholder="username"
                  className=" border-white/30 placeholder:text-off-white/50"
                  onChange={handleChange}
                />
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="password"
                  className="border-white/30 placeholder:text-off-white/50"
                  onChange={handleChange}
                />

                <Button
                  className="border rounded-lg bg-whitesmoke text-black w-full mt-4 h-8"
                  type="submit"
                >
                  Login
                </Button>
              </form>
              <p className="mt-6 text-center text-sm">
                Don't have an account?{" "}
                <span className="underline cursor-pointer">Sign up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
