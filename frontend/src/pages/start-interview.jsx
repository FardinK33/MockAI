import { useEffect, useRef, useState } from "react";
import { Button, Input, TextArea } from "../components";
import useStartInterview from "../hooks/interview-hooks/useStartInterview";
import useLogout from "../hooks/auth-hooks/useLogout";
import toast from "react-hot-toast";

const initialState = {
  jobRole: "",
  experience: "",
  interviewType: "",
  jobDescription: "",
};

const StartInterview = () => {
  const [jobDetails, setJobDetails] = useState(initialState);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const { startInterview, loading } = useStartInterview();
  const { loading: isLogout, logout } = useLogout();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
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
        toast.error("Media access error");
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
    <div className="min-h-screen relative p-4 sm:p-5 text-sm">
      {/* Logout Button */}
      <div className="absolute top-5 right-5 md:top-10 md:right-10 z-10">
        <Button
          disabled={isLogout}
          className="bg-blue-600 text-white/80 hover:bg-blue-700 font-medium w-full rounded-md p-2 px-4"
          onClick={async () => await logout()}
        >
          {isLogout ? "Logging Out..." : "Logout"}
        </Button>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0">
        <div
          className="relative h-full w-full bg-slate-950 
      [&>div]:absolute 
      [&>div]:inset-0 
      [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] 
      [&>div]:bg-[size:14px_24px] 
      [&>div]:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        >
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative text-white max-w-7xl mx-auto h-full flex flex-col justify-center items-center p-4 sm:p-10">
        <h1 className="text-2xl sm:text-3xl text-white font-medium mb-6 text-center">
          Job Details
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-evenly w-full gap-8">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
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
                  className="bg-accent text-white/80 font-medium w-full rounded-md p-2"
                >
                  {loading ? "Starting..." : "Start Interview"}
                </Button>
              </div>
            </form>
          </div>

          {/* Video Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
            <div className="w-full max-w-md h-60 rounded-lg overflow-hidden shadow-sm">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            </div>
            {!permissionGranted && (
              <p className="text-red-400 text-sm text-center">
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
