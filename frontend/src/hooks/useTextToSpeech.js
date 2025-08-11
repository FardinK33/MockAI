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

// // useTextToSpeech.js
// import { useState, useEffect } from 'react';

// export function useTextToSpeech() {
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const speak = (text) => {
//     return new Promise((resolve) => {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.onstart = () => setIsSpeaking(true);
//       utterance.onend = () => {
//         setIsSpeaking(false);
//         resolve();
//       };
//       speechSynthesis.speak(utterance);
//     });
//   };

//   useEffect(() => {
//     return () => speechSynthesis.cancel(); // Clean up on unmount
//   }, []);

//   return { speak, isSpeaking };
// }
