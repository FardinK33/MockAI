import { useEffect } from "react";
import Button from "./button";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { CiMicrophoneOn } from "react-icons/ci";
// Adjust if your Button path differs

const InstructionsModal = ({ onClose }) => {
  useEffect(() => {
    // Prevent scroll behind modal
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 font-general-sans flex items-center justify-center px-4">
      <div className="bg-neutral-950 rounded-lg shadow-xl max-w-lg w-full p-6 text-white/80 relative">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Interview Instructions
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-sm sm:text-base">
          <li>After starting, AI will ask you questions.</li>
          <li>Your mic will be enabled so you can answer.</li>
          <li>
            You can replay the question using the{" "}
            <strong className="font-cabinet-grotesk font-bold text-lg">
              Speaker{" "}
              <HiOutlineSpeakerWave className="inline text-blue-500 font-bold text-2xl" />
            </strong>{" "}
            button, but your current answer will be reset.
          </li>
          <li>
            After finishing your answer, press the{" "}
            <strong className="font-cabinet-grotesk font-bold text-lg">
              Mic{" "}
              <CiMicrophoneOn className="inline text-green-500 font-bold text-2xl" />
            </strong>{" "}
            button to submit it.
          </li>
          <li>
            AI will evaluate your response and continue the interview loop.
          </li>
        </ol>

        <div className="mt-6 text-center">
          <Button
            className="bg-accent text-white font-medium rounded-md px-4 py-2"
            onClick={onClose}
          >
            Got it!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
