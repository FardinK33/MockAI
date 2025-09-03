import { useNavigate } from "react-router-dom";
import { Button, Scores, Tags } from "../components";
import useInterviewStore from "../zustand/interview-store";

const AnalysisPage = () => {
  const { result } = useInterviewStore();
  const navigate = useNavigate();

  if (!result) {
    return (
      <div className="min-h-screen py-10 px-4 sm:px-6 md:px-10 w-full relative flex justify-center items-center">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full -z-10 bg-slate-950 [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [&>div]:bg-[size:14px_24px] [&>div]:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
            <div></div>
          </div>
        </div>
        <div className="font-semibold text-off-white text-3xl font-cabinet-grotesk animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 md:px-10 w-full relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full -z-10 bg-slate-950 [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [&>div]:bg-[size:14px_24px] [&>div]:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-whitesmoke font-cabinet-grotesk max-w-6xl w-full mx-auto h-full flex flex-col z-10">
        {/* Header */}
        <div>
          <div className="flex flex-wrap justify-between items-end gap-3">
            <h1 className="text-4xl md:text-5xl font-semibold text-[#f3ddc2] tracking-wide">
              Analysis
            </h1>
            <div className="text-xl md:text-2xl font-semibold">
              {result.overallRating} ✨
            </div>
          </div>
          <div className="border w-full mt-2"></div>
        </div>

        {/* Content */}
        <div className="grow flex flex-col md:flex-row overflow-y-auto py-3 gap-6">
          {/* Left Section */}
          <div className="md:w-2/3 w-full">
            <div>
              <h2 className="text-2xl text-whitesmoke font-clash-display font-medium">
                Summary
              </h2>
              <p className="font-general-sans text-white leading-tight">
                {result ? result.analysis.summary : "Loading..."}
              </p>
              <div className="border border-whitesmoke/20 w-full mt-2"></div>
            </div>

            <div className="mt-3">
              <h2 className="text-2xl text-whitesmoke font-clash-display font-medium">
                Strength
              </h2>
              <ul className="list-disc pl-5 font-general-sans tracking-wide text-base">
                {result?.analysis?.strengths.map((str, idx) => (
                  <li key={idx} className="leading-tight mt-0.5">
                    {str}
                  </li>
                ))}
              </ul>
              <div className="border border-whitesmoke/20 w-full mt-2"></div>
            </div>

            <div className="mt-3">
              <h2 className="text-2xl text-whitesmoke font-clash-display font-medium">
                Weakness
              </h2>
              <ul className="list-disc pl-5 font-general-sans tracking-wide">
                {result?.analysis?.weaknesses.map((str, idx) => (
                  <li key={idx} className="leading-tight mt-1">
                    {str}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/3 w-full">
            <p className="text-2xl font-clash-display text-whitesmoke font-medium">
              Scores
            </p>
            <Scores
              category="Communication"
              score={result?.analysis?.scores.communication}
            />
            <Scores
              category="Problem Solving"
              score={result?.analysis?.scores.problemSolving}
            />
            <Scores
              category="Technical Skills"
              score={result?.analysis?.scores.technicalSkill}
            />

            <div className="mt-4">
              <p className="text-2xl font-clash-display text-whitesmoke font-medium">
                Tags
              </p>
              <div className="flex gap-2 flex-wrap pt-2 overflow-y-auto max-h-40">
                {result?.analysis?.tags.map((name, idx) => (
                  <Tags key={idx} name={name} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center items-center pt-6">
          <Button
            className="bg-off-white hover:bg-off-white/90 rounded-xl text-black font-semibold font-sans cursor-pointer p-2"
            onClick={() => navigate("/")}
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
