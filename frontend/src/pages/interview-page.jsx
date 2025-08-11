import { Button, VideoStream } from "../components";
import { useInterviewController } from "../hooks/useInterviewController";

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
    <div className="bg-black border p-10 h-screen w-full flex md:flex-row justify-center items-center">
      <div className="flex-1 flex items-center h-full rounded-3xl">
        <div className="bg-neutral-800 w-full h-[100%] rounded-xl overflow-hidden">
          <VideoStream />
        </div>
      </div>
      <div className="h-full border  w-0.5"></div>
      <div className="flex-1 flex flex-col justify-around items-center gap-2 h-full rounded-3xl">
        <div className="bg-neutral-800 w-full h-[100%] rounded-xl flex flex-col justify-center items-center">
          <div className="p-10 rounded-full bg-gradient-to-b from-violet-800 to-pink-800 flex items-center justify-center text-whitesmoke text-7xl shadow-sm shadow-muted-foreground">
            <RiRobot3Line />
          </div>
          <div className=" mt-20 text-white italic text-xl font-semiboldbold">
            {statusText}
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 text-2xl rounded-full flex justify-center gap-7 bg-black p-4">
        <Button
          className={`bg-sky-700 text-gray-400 rounded-full h-14`}
          onClick={handleSpeakClick}
          disabled={isSpeaking || !interviewStatus}
        >
          <HiOutlineSpeakerWave />
        </Button>
        {listening && !isSpeaking ? (
          <Button
            className={`bg-green-500 text-gray-400 rounded-full h-14`}
            onClick={handleMicClick}
            disabled={!interviewStatus}
          >
            <CiMicrophoneOn />
          </Button>
        ) : (
          <Button
            className={`"bg-gray-800" text-gray-400 rounded-full h-14`}
            disabled
          >
            <CiMicrophoneOff />
          </Button>
        )}

        <Button
          className="bg-red-600 rounded-full h-14 hover:bg-red-700"
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
