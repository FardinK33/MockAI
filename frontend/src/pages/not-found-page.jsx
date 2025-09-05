import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-neutral-950 flex flex-col p-4 gap-3">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      {/* Main Card */}
      <div className="border border-neutral-800 rounded-lg shadow-sm w-full h-full flex items-center justify-center relative overflow-hidden bg-neutral-900 py-10 px-6">
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 z-[-1] h-full w-full bg-neutral-950 bg-[radial-gradient(#ffffff22_1px,#0a0a0a_1px)] bg-[size:20px_20px]"></div>
        </div>

        {/* Content */}
        <div className="z-10 text-center text-white space-y-4 max-w-xl mx-auto flex flex-col justify-center items-center">
          <h1 className="text-6xl font-extrabold font-cabinet-grotesk tracking-tight">
            404
          </h1>
          <p className="text-xl font-semibold font-cabinet-grotesk">
            Page Not Found
          </p>
          <p className="text-white/60 font-general-sans">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            className="bg-accent hover:bg-accent/80 transition-colors duration-200 text-white font-general-sans font-medium rounded-md px-5 py-2 mt-4"
            onClick={() => navigate("/")}
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
