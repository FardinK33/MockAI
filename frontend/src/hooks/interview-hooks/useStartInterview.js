import { useState } from "react";
import useInterviewStore from "../../zustand/interview-store";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import toast from "react-hot-toast";

const interviewFormSchema = z.object({
  jobRole: z.string().nonempty("Invalid job role"),
  experience: z.string().nonempty("Invalid experience"),
  interviewType: z.string().nonempty("Invalid interview type"),
  jobDescription: z.string().nonempty("Invalid job description"),
});

const useStartInterview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentInterviewId, setInterviewStatus, addMessage } =
    useInterviewStore();

  const startInterview = async ({
    jobRole,
    experience,
    interviewType,
    jobDescription,
  }) => {
    try {
      setLoading(true);

      const result = interviewFormSchema.safeParse({
        jobRole,
        experience,
        interviewType,
        jobDescription,
      });

      if (!result.success) {
        const message = result.error.issues[0].message;
        throw new Error(message);
      }

      const response = await fetch(
        "https://mockai-i25k.onrender.com/api/interview/start-interview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to reach backend");
      }

      const newInterview = await response.json();

      if (!newInterview.success) {
        throw new Error(newInterview.message);
      }

      setCurrentInterviewId(newInterview.data.id);
      addMessage({ role: "ai", text: newInterview.data.text });
      setInterviewStatus(true);
      navigate(`/interview/${newInterview.data.id}`);
      toast.success("New Interview Created", {
        position: "top-right",
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, startInterview };
};

export default useStartInterview;
