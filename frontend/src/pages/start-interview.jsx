import { useEffect, useRef, useState } from "react";
import { Button, Input, TextArea } from "../components";
import useStartInterview from "../hooks/useStartInterview";

// Optional: move this to types.ts or schema file
const initialState = {
  jobRole: "",
  experience: "",
  jobDescription: "",
  interviewType: "",
};

const StartInterview = () => {
  const [jobDetails, setJobDetails] = useState(initialState);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const { startInterview, loading } = useStartInterview();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { jobRole, experience, interviewType, jobDescription } = jobDetails;
    return jobRole && experience && interviewType && jobDescription;
  };

  const validateMediaTracks = () => {
    const stream = mediaStreamRef.current;
    if (!stream) return false;

    const videoTrack = stream.getVideoTracks()[0];
    const audioTrack = stream.getAudioTracks()[0];

    return (
      videoTrack?.enabled &&
      videoTrack?.readyState === "live" &&
      audioTrack?.enabled &&
      audioTrack?.readyState === "live"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill all fields before starting the interview.");
      return;
    }

    if (!validateMediaTracks()) {
      alert("Camera and Mic must be active to proceed.");
      return;
    }

    await startInterview(jobDetails);
    setJobDetails(initialState);
  };

  useEffect(() => {
    const requestMediaPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setPermissionGranted(true);
      } catch (err) {
        console.error("Media access error:", err);
        setPermissionGranted(false);
      }
    };

    requestMediaPermissions();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-screen bg-neutral-950 p-5 text-sm py-15">
      <div className="text-white w-4xl mx-auto h-full flex flex-col justify-center items-center p-10 relative">
        <h1 className="text-3xl text-accent font-medium">Job Details</h1>

        <div className="flex-1 flex h-full justify-evenly w-full py-3">
          <div className="flex-1 flex items-center justify-center">
            <form className="mx-auto w-80 max-w-xl" onSubmit={handleSubmit}>
              <Input
                label="Job Role"
                name="jobRole"
                value={jobDetails.jobRole}
                placeholder="e.g. Full Stack Developer"
                onChange={handleChange}
              />
              <Input
                label="Experience"
                name="experience"
                value={jobDetails.experience}
                placeholder="e.g. Fresher, 2+ years"
                onChange={handleChange}
              />
              <Input
                label="Interview Type"
                name="interviewType"
                value={jobDetails.interviewType}
                placeholder="Technical / Behavioral"
                onChange={handleChange}
              />
              <TextArea
                label="Job Description"
                name="jobDescription"
                value={jobDetails.jobDescription}
                placeholder="Brief job description"
                onChange={handleChange}
              />

              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={!permissionGranted || loading}
                  className="bg-accent text-black/80 font-medium w-full"
                >
                  {loading ? "Starting..." : "Start Interview"}
                </Button>
              </div>
            </form>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-5">
            <div className="h-60 w-96 rounded-lg overflow-hidden shadow-sm">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            </div>
            {!permissionGranted && (
              <p className="text-red-400 text-sm">
                Please allow camera and microphone access to proceed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
