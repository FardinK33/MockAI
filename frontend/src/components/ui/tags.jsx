import React from "react";

const Tags = ({ name }) => {
  return (
    <div className="rounded-xl border px-2 text-sm flex justify-center items-center">
      {name}
    </div>
  );
};

export default Tags;
