import { useNavigate } from "react-router-dom";
import { Button, Scores, Tags } from "../components";
import useInterviewStore from "../zustand/interview-store";

const InterviewAnalysis = () => {
  const { result } = useInterviewStore();
  const navigate = useNavigate();

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black h-screen py-10 w-full">
      <div className="text-whitesmoke font-cabinet-grotesk w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="">
          <div className="flex justify-between items-end">
            <h1 className="text-5xl font-semibold text-[#f3ddc2] tracking-wide">
              Analysis
            </h1>
            <div className="text-2xl font-semibold">
              {result.overallRating} ✨
            </div>
          </div>
          <div className="border w-full mt-2"></div>
        </div>

        {/* Content */}
        <div className="grow flex overflow-y-auto py-3">
          <div className="flex-1">
            <div className="">
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
              <ul className="list-disc pl-5 font-general-sans tracking-wide ">
                {result?.analysis?.weaknesses.map((str, idx) => (
                  <li key={idx} className="leading-tight mt-1">
                    {str}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-1/3 pl-3">
            <div className="">
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
            </div>
            <div className="mt-4">
              <p className="text-2xl font-clash-display text-whitesmoke font-medium">
                Tags
              </p>
              <div className="flex gap-2 flex-wrap pt-2 overflow-y-auto">
                {result?.analysis?.tags.map((name, idx) => (
                  <Tags key={idx} name={name} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Button Div */}
        <div className="flex justify-center items-center pt-4">
          <Button
            className="bg-off-white hover:bg-off-white/90 rounded-xl text-black font-semibold font-sans"
            onClick={() => navigate("/")}
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewAnalysis;
