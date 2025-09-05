import { useNavigate } from "react-router-dom";
import useInterviewStore from "../../zustand/interview-store";
import toast from "react-hot-toast";

const ListItem = ({
  _id,
  jobRole,
  experience,
  status,
  overallRating,
  tags,
  analysis,
}) => {
  const { setResult } = useInterviewStore();
  const navigate = useNavigate();
  const handleClick = () => {
    if (!overallRating || !analysis) {
      toast.error("Analysis not available");
      return;
    }
    setResult({ overallRating, analysis });
    navigate(`/analysis/${_id}`);
  };

  return (
    <div className="w-full border-b border-neutral-800 px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-all duration-200">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Circle Icon or Avatar */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/20 text-accent font-bold uppercase text-sm">
          {jobRole?.[0] || "J"}
        </div>

        {/* Job Info */}
        <div className="cursor-pointer" onClick={handleClick}>
          <h3 className="text-white font-medium text-sm md:text-base">
            {jobRole}
          </h3>
          <p className="text-xs text-white/60">experience: {experience}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="hidden md:flex gap-2 items-center">
        {tags?.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-1 bg-neutral-800 text-white/70 rounded-md font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status and Rating */}
      <div className="flex items-center gap-6">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md ${
            status === "active"
              ? "text-green-400 bg-green-400/10"
              : status === "completed"
                ? "text-gray-400 bg-zinc-400/10"
                : "text-yellow-400 bg-yellow-400/10"
          }`}
        >
          {status}
        </span>

        <div className="text-white/80 text-sm">⭐ {overallRating}/5</div>
      </div>
    </div>
  );
};

export default ListItem;
