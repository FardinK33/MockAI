import { useNavigate } from "react-router-dom";
import { Button, ListItem } from "../components";
import useLogout from "../hooks/auth-hooks/useLogout";
import useGetInterviews from "../hooks/interview-hooks/useGetInterviews";
import useUserStore from "../zustand/user-store";

const Homepage = () => {
  const navigate = useNavigate();
  const { loading: isLogout, logout } = useLogout();
  const { loading } = useGetInterviews();
  const previousInterviews = useUserStore((state) => state.previousInterviews);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="h-screen bg-neutral-950 flex flex-col p-4 gap-3">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      {/* Logout Button */}
      <div className="flex justify-end w-full items-center z-10">
        <Button
          disabled={isLogout}
          className="border border-neutral-800 text-white/80 hover:bg-neutral-800 font-medium font-general-sans rounded-md p-2 px-4"
          onClick={handleLogout}
        >
          {isLogout ? "Logging Out..." : "Logout"}
        </Button>
      </div>

      {/* Hero Section */}
      <div className="border border-neutral-800 rounded-lg shadow-sm w-full flex flex-col md:flex-row items-center justify-between px-6 relative overflow-hidden bg-neutral-900 py-5">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 z-[-1] h-full w-full bg-neutral-950 bg-[radial-gradient(#ffffff22_1px,#0a0a0a_1px)] bg-[size:20px_20px]"></div>
        </div>

        {/* Content */}
        <div className="z-10 text-white">
          <h1 className="text-xl md:text-4xl font-semibold mb-1 font-cabinet-grotesk">
            Practice Interviews. Powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 tracking-wider font-extrabold">
              AI
            </span>
            . Perfected by You.
          </h1>
          <p className="text-white/60 font-general-sans text-md">
            Get ready for real interviews with instant AI feedback.
          </p>
        </div>

        {/* CTA Button */}
        <div className="z-10 pt-4 md:py-0">
          <Button
            className="bg-accent text-white hover:bg-accent/80 font-general-sans font-medium rounded-md px-4 py-2"
            onClick={() => navigate("/start-interview")}
          >
            Create Interview
          </Button>
        </div>
      </div>

      {/* Interview List Container */}
      <div className="border border-neutral-800 rounded-lg w-full flex-1 min-h-0 overflow-y-auto divide-y divide-neutral-800 mt-4 z-0">
        {loading ? (
          <div className="text-white text-center py-10 flex items-center justify-center h-full text-xl font-medium font-general-sans">
            Loading interviews...
          </div>
        ) : previousInterviews.length === 0 ? (
          <div className="text-white text-center py-10 flex items-center justify-center h-full text-xl font-general-sans">
            Let's Start giving Mock Interviews.
          </div>
        ) : (
          previousInterviews.map((interview, idx) => (
            <ListItem key={idx} {...interview} />
          ))
        )}
      </div>
    </div>
  );
};

export default Homepage;
