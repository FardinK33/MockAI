import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useTextToSpeech } from "./useTextToSpeech";
import useSendMessage from "./useSendMessage";
import useStopInterview from "./useStopInterview";
import useInterviewStore from "../zustand/interview-store";

const AI_STATES = {
  SPEAKING: "Speaking",
  LISTENING: "Listening",
  PROCESSING: "Processing",
};

export const useInterviewController = () => {
  const [statusText, setStatusText] = useState(AI_STATES.SPEAKING);

  const { speak, isSpeaking } = useTextToSpeech();
  const { sendMessage } = useSendMessage();
  const { stopInterview } = useStopInterview();
  const { conversation, interviewStatus } = useInterviewStore();

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg?.text) {
      startLoop(lastMsg.text);
    }
  }, []);

  const startLoop = async (messageToSpeak) => {
    try {
      resetTranscript();
      setStatusText(AI_STATES.SPEAKING);
      SpeechRecognition.stopListening();
      await speak(messageToSpeak);

      if (interviewStatus) {
        setStatusText(AI_STATES.LISTENING);
        SpeechRecognition.startListening({ continuous: true });
      } else {
        await stopInterview();
      }
    } catch (err) {
      console.error("Loop error:", err);
    }
  };

  const handleMicClick = async () => {
    SpeechRecognition.stopListening();

    if (!transcript.trim()) {
      setStatusText(AI_STATES.SPEAKING);
      await speak("Couldn't hear you. Please speak closer to the mic.");
      setStatusText(AI_STATES.LISTENING);
      SpeechRecognition.startListening({ continuous: true });
      return;
    }

    setStatusText(AI_STATES.PROCESSING);
    const reply = await sendMessage(transcript);
    setStatusText(AI_STATES.SPEAKING);

    if (reply) {
      await startLoop(reply);
    }
  };

  const handleSpeakClick = () => {
    const last = conversation[conversation.length - 1];
    if (last?.text && !isSpeaking) {
      startLoop(last.text);
    }
  };

  const handleStopClick = async () => {
    SpeechRecognition.stopListening();
    await stopInterview();
  };

  return {
    statusText,
    isSpeaking,
    listening,
    handleSpeakClick,
    handleMicClick,
    handleStopClick,
  };
};
