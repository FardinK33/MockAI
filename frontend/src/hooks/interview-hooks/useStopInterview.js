import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useInterviewStore from "../../zustand/interview-store";
import toast from "react-hot-toast";

const useStopInterview = () => {
  const { id } = useParams();
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

      if (!res.ok) {
        throw new Error("Unable to reach backend");
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setResult(data.data);
      navigate(`/analysis/:${id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setInterviewStatus(false);
    }
  };

  return { loading, stopInterview };
};

export default useStopInterview;
