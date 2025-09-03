import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInterviewStore from "../../zustand/interview-store";

const useStopInterview = () => {
  const [loading, setLoading] = useState(false);
  const { currentInterviewId, setInterviewStatus, setResult } =
    useInterviewStore();
  const navigate = useNavigate();

  const stopInterview = async () => {
    try {
      setLoading(true);
      setInterviewStatus(false);
      const res = await fetch(
        `/api/interview/${currentInterviewId}/stop-interview`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(res);
      }

      console.log(data.data.parsedAnalysis);
      setResult(data.data.parsedAnalysis);
      navigate("/analysis");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInterviewStatus(false);
    }
  };

  return { loading, stopInterview };
};

export default useStopInterview;
