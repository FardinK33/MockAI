import { useEffect, useState } from "react";
import useUserStore from "../../zustand/user-store";
import toast from "react-hot-toast";

const useGetInterviews = () => {
  const [loading, setLoading] = useState(false);
  const { setPreviousInterviews } = useUserStore();

  useEffect(() => {
    const getAllInterviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://mockai-i25k.onrender.com/api/interview/get-all",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Unable to reach backend");
        }

        const interviews = await res.json();

        if (!interviews.success) {
          throw new Error(interviews.message);
        }

        setPreviousInterviews(interviews.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllInterviews();
  }, []);

  return { loading };
};

export default useGetInterviews;
