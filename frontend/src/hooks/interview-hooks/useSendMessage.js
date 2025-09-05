import { useState } from "react";
import useInterviewStore from "../../zustand/interview-store";
import * as z from "zod";
import toast from "react-hot-toast";

const messageSchema = z.object({
  message: z.string("Invalid Response"),
});

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { currentInterviewId, addMessage, setInterviewStatus } =
    useInterviewStore();

  const sendMessage = async (message) => {
    try {
      const result = messageSchema.safeParse({ message });

      if (!result.success) {
        const errMsg = result.error.issues[0].message;
        throw new Error("Invalid Message");
      }

      addMessage({ role: "user", text: message });

      setLoading(true);

      const res = await fetch(`/api/interview/${currentInterviewId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const AiResponse = await res.json();
      if (!AiResponse.success) {
        throw new Error(AiResponse.message);
      }

      addMessage({ role: "ai", text: AiResponse.data.text });
      if (AiResponse.data.isFinal) {
        setInterviewStatus(false);
      }
      return AiResponse.data.text;
    } catch (error) {
      toast.error("Error Occurred : ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
