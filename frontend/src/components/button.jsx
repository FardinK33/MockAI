import React from "react";
import { clsx } from "clsx";

const Button = ({ children, className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      className={clsx(
        "flex items-center cursor-pointer justify-center px-4 py-1.5 transition-colors  disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
