import { useState } from "react";
import bgImage from "../assets/wave-bg.jpg";
import { RiRobot3Line } from "react-icons/ri";
import { LoginForm, SignupForm } from "../components/index";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const [newUser, setNewUser] = useState(false);

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
        <div className="relative flex flex-col justify-around  md:border-2 border-white/50 rounded-2xl md:rounded-l-none overflow-hidden bg-black/80 md:bg-black/90">
          {/* Radial Gradient Background */}
          <div className="absolute inset-0 md:hidden">
            <div className="absolute inset-0 z-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
          </div>

          {/* Content */}
          <div className="z-10 relative overflow-y-auto p-5">
            <div className="rounded-full flex justify-center items-center size-24 mx-auto">
              <img
                src={logo}
                alt="Mock AI Logo"
                className="object-contain size-full"
                draggable={false}
              />
            </div>
            <div className={`mt-2 mx-auto w-full max-w-xs sm:max-w-sm`}>
              <p className="text-2xl sm:text-3xl font-general-sans font-medium text-center">
                {newUser ? "Hello There !" : "Welcome Back"}
              </p>
              {newUser ? (
                <>
                  <SignupForm />
                  <p className="mt-6 text-center text-sm">
                    Already have an account?{" "}
                    <span
                      className="underline cursor-pointer "
                      onClick={() => setNewUser((prev) => !prev)}
                    >
                      Log in
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <LoginForm />
                  <p className="mt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <span
                      className="underline cursor-pointer"
                      onClick={() => setNewUser((prev) => !prev)}
                      z
                    >
                      Sign up
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
