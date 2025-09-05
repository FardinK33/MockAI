import { Button, VideoStream } from "../components";
import { useInterviewController } from "../hooks/interview-hooks/useInterviewController";

import { RiRobot3Line } from "react-icons/ri";
import { MdCallEnd } from "react-icons/md";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import useInterviewStore from "../zustand/interview-store";

const InterviewPage = () => {
  const { interviewStatus } = useInterviewStore();
  const {
    statusText,
    isSpeaking,
    listening,
    handleSpeakClick,
    handleMicClick,
    handleStopClick,
  } = useInterviewController();

  return (
    <div className="border p-10 h-screen w-full relative overflow-y-scroll flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_50%,#000_40%,#63e_100%)]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 w-full h-full overflow-y-auto">
        <div className="flex-1 flex items-center h-full rounded-3xl">
          <div className="bg-neutral-800 w-full h-[100%] rounded-xl overflow-hidden">
            <VideoStream />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-around items-center gap-2 h-full rounded-3xl overflow-y-auto">
          <div className=" w-full h-[100%] rounded-xl flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 z-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_50%,#000_20%,#63e_100%)]"></div>
            </div>
            <div className="p-5 rounded-full bg-gradient-to-b from-violet-800 to-pink-800 flex items-center justify-center text-whitesmoke text-3xl md:text-5xl shadow-sm shadow-muted-foreground">
              <RiRobot3Line />
            </div>
            <div className="mt-2 text-white italic text-base font-semiboldbold">
              {statusText}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 lg:text-2xl rounded-full flex justify-center gap-7 bg-black p-4 items-center">
        <Button
          className={`bg-sky-700 text-gray-400 rounded-full p-3`}
          onClick={handleSpeakClick}
          disabled={isSpeaking || !interviewStatus}
        >
          <HiOutlineSpeakerWave />
        </Button>
        {listening && !isSpeaking ? (
          <Button
            className={`bg-green-500 text-gray-400 rounded-full p-3`}
            onClick={handleMicClick}
            disabled={!interviewStatus}
          >
            <CiMicrophoneOn />
          </Button>
        ) : (
          <Button
            className={`"bg-gray-800" text-gray-400 rounded-full p-3`}
            disabled
          >
            <CiMicrophoneOff />
          </Button>
        )}

        <Button
          className="bg-red-600 rounded-full hover:bg-red-700 p-3"
          onClick={handleStopClick}
          disabled={!interviewStatus}
        >
          <MdCallEnd />
        </Button>
      </div>
    </div>
  );
};

export default InterviewPage;
