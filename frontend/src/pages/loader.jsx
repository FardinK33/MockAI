import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 md:px-10 w-full relative flex justify-center items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        </div>
      </div>
      <div className="font-semibold text-off-white text-3xl font-cabinet-grotesk animate-pulse">
        Loading...
      </div>
    </div>
  );
};

export default Loader;
