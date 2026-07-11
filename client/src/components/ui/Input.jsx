function Input({
    type = "text",
    placeholder,
    className = "",
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full
      bg-gray-100
      rounded-xl
      px-4
      py-3
      outline-none
      focus:ring-2
      focus:ring-blue-500
      ${className}`}
        />
    );
}

export default Input;
