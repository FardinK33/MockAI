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
      className="h-screen bg-cover p-10"
    >
      <div
        className={`h-full rounded-2xl w-5xl mx-auto overflow-hidden flex justify-center items-center text-whitesmoke`}
      >
        <div className="flex-1 h-full inset-0 bg-purple-900/20 border-4 border-white/50 rounded-2xl rounded-r-none border-r-0">
          <div className="flex flex-col text-white justify-end h-full p-3 pb-8">
            <h1 className="text-5xl font-bold font-cabinet-grotesk tracking-tight">
              Prepare Smarter, Perform Better{" "}
            </h1>
            <p className="text-xl font-general-sans text-gray-300">
              AI that prepares you to ace Interviews - faster, smarter, and with
              greater confidence.
            </p>
          </div>
        </div>
        {/* <div className="h-full border border-gray-700 w-0.5 rounded-2xl"></div> */}

        <div className="flex-1 flex flex-col justify-around h-full bg-black rounded-r-2xl border-l-0 border-4 border-white/50">
          <div className="text-5xl p-2 rounded-full mx-auto">
            <RiRobot3Line />
          </div>
          <div className="mx-auto">
            <p className="text-3xl font-general-sans font-medium">
              Welcome Back
            </p>
            <form onSubmit={handleSubmit} className="w-80 max-w-xl mt-6">
              <Input
                name="username"
                label="Email"
                type="text"
                placeholder="username"
                onChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="password"
                onChange={handleChange}
              />

              <p className="text-sm">forgot password ?</p>

              <Button
                className="border rounded-lg bg-whitesmoke text-black w-full mt-5"
                type="submit"
              >
                Login
              </Button>
            </form>
          </div>
          <p className="mt-8 text-center">Don't have an account ? Sign up</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
