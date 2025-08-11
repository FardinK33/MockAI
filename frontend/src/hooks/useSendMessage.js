import { useState } from "react";
import useInterviewStore from "../zustand/interview-store";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { currentInterviewId, addMessage, setInterviewStatus } =
    useInterviewStore();

  const sendMessage = async (message) => {
    try {
      if (!message.trim()) {
        console.error("Invalid Message");
        return;
      }

      addMessage({ role: "user", text: message });

      setLoading(true);

      const res = await fetch(`/api/interview/${currentInterviewId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data);
      }
      console.log(data);

      addMessage({ role: "ai", text: data.data.text });
      if (data.data.isFinal) {
        setInterviewStatus(false);
      }
      return data.data.text;
    } catch (error) {
      console.error("Error Occurred : ", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
