import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useTextToSpeech } from "./useTextToSpeech";
import useSendMessage from "./useSendMessage";
import useStopInterview from "./useStopInterview";
import useInterviewStore from "../../zustand/interview-store";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const AI_STATES = {
  SPEAKING: "Speaking",
  LISTENING: "Listening",
  PROCESSING: "Processing",
};

export const useInterviewController = () => {
  const id = useParams();
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState(AI_STATES.SPEAKING);
  const { speak, isSpeaking } = useTextToSpeech();
  const { sendMessage } = useSendMessage();
  const { stopInterview } = useStopInterview();
  const {
    conversation,
    interviewStatus,
    setCurrentInterviewId,
    setInterviewStatus,
    setConversation,
  } = useInterviewStore();

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const startInterview = async () => {
      const lastMsg = conversation[conversation.length - 1];
      if (lastMsg?.text) {
        startLoop(lastMsg.text);
      } else {
        try {
          const res = await fetch(`/api/interview/getInterview/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            toast.error("Unable to reach backend");
            navigate("/");
          }

          const interviewData = await res.json();

          if (!interviewData.succes || interviewData.data.status !== "active") {
            toast.error(interviewData.message);
            navigate("/");
          }

          setCurrentInterviewId(interviewData.data.id);
          setInterviewStatus(true);

          const conversationLength = interviewData.data.conversation.length;

          if (conversationLength > 0) {
            setConversation(interviewData.data.conversation);
          }

          const lastMessage =
            interviewData.data.conversation[conversationLength - 1];
          startLoop(lastMessage);
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    startInterview();
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
      toast.error("Loop error: ", err.message);
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
