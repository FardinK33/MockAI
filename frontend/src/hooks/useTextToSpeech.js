import { useState } from "react";

// hooks/useTextToSpeech.ts
export const useTextToSpeech = () => {
  const synth = window.speechSynthesis;
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = async (text) => {
    return new Promise((resolve, reject) => {
      if (!synth) {
        reject(new Error("SpeechSynthesis not supported"));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
        resolve(); // Resolve when speech ends
      };

      utterance.onerror = (e) => {
        setIsSpeaking(false);
        reject(e.error);
      };

      synth.speak(utterance);
    });
  };

  return { speak, isSpeaking };
};
