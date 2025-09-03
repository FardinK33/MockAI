import { useState } from "react";
import { generateInitialPrompt } from "../../utils/prompt";
import useInterviewStore from "../../zustand/interview-store";
import { useNavigate } from "react-router-dom";

const payload = {
  data: {
    id: "1fa550e0-7c15-4238-b291-7f182d9c7d41",
    text: "Hello! My name is Alex, and I'll be conducting your interview today. It's great to have you here. We are looking for a MERN Stack Developer, and I'm excited to learn more about your skills and experience. To start, could you please tell me a bit about what sparked your interest in web development, specifically with the MERN stack, and what excites you most about working with these technologies?",
  },
  err: "",
  message: "new interview created",
  success: true,
};

const useStartInterview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentInterviewId, setInterviewStatus, addMessage } =
    useInterviewStore();

  const startInterview = async (formData) => {
    try {
      const interviewDetails = generateInitialPrompt(formData);
      setLoading(true);

      const response = await fetch("/api/interview/start-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interviewDetails }),
      });

      const data = await response.json();
      // console.log(data);
      // const data = payload;

      if (!data.success) {
        throw new Error(data);
      }

      setCurrentInterviewId(data.data.id);
      addMessage({ role: "ai", text: data.data.text });
      setInterviewStatus(true);
      navigate("/interview");
    } catch (error) {
      console.error("Error Occured : ", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, startInterview };
};

export default useStartInterview;
