const Input = ({
  label,
  error,
  name = "",
  ref = null,
  type = "text",
  placeholder = "",
  className = "",
  wrapperClassName = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 my-2 ${wrapperClassName}`}>
      {label && <label className="text-sm text-whitesmoke">{label}</label>}
      <input
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`border ${
          error ? "border-red-500" : "border-gray-700"
        } focus:border-white/70 placeholder:text-gray-500 outline-none text-off-white px-2.5 py-1.5 rounded-md w-full ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
