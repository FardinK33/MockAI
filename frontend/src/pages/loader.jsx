import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 md:px-10 w-full relative flex justify-center items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full -z-10 bg-slate-950 [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [&>div]:bg-[size:14px_24px] [&>div]:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
          <div></div>
        </div>
      </div>
      <div className="font-semibold text-off-white text-3xl font-cabinet-grotesk animate-pulse">
        Loading...
      </div>
    </div>
  );
};

export default Loader;
