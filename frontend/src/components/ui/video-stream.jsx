import { useEffect, useRef, useState } from "react";

const VideoStream = ({ muted = true }) => {
  // Ref for video element
  const ref = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(false);
  const [isStreamReady, setIsStreamReady] = useState(false);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        setIsStreamReady(true);
      } catch (err) {
        console.error("Media access error:", err);
        setError(true);
      }
    };

    getMediaStream();

    return () => {
      // Cleanup stream when the component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null); // Clear reference
      }
    };
  }, []); // Effect only runs once

  useEffect(() => {
    if (ref.current && stream) {
      ref.current.srcObject = stream;
    }
  }, [stream, ref.current]);

  if (error) {
    return (
      <div className="text-center text-red-500">Error accessing media</div>
    );
  }

  return (
    <div className="bg-neutral-800 w-full h-full rounded-xl overflow-hidden">
      {!isStreamReady ? (
        <div className="text-center text-gray-500">Loading stream...</div> // Show loading until stream is ready
      ) : (
        <video
          ref={ref}
          autoPlay
          muted={muted}
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isStreamReady ? 1 : 0,
          }}
        />
      )}
    </div>
  );
};

export default VideoStream;
