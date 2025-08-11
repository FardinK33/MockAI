import React, { forwardRef } from "react";

const TextArea = forwardRef(function TextArea(
  {
    label,
    error,
    type = "text",
    name = "",
    placeholder = "",
    className = "",
    wrapperClassName = "",
    ...props
  },
  ref
) {
  return (
    <div className={`flex flex-col gap-2 my-2 ${wrapperClassName}`}>
      {label && <label className="font-normal text-whitesmoke">{label}</label>}
      <textarea
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`border ${
          error ? "border-red-500" : "border-gray-700"
        } focus:border-white/70 placeholder:text-gray-500 outline-none text-whitesmoke h-24 px-2.5 py-2 rounded-md w-full ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

export default TextArea;
