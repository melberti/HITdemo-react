function Button({
  size = "normal",
  color = "primary",
  onClick,
  children,
  type = "submit",
  className = "",
}) {
  const sizeClass = size === "small" ? "small" : "normal";
  const colorClass = color;
  //   color === "neutral"
  //     ? "neutral"
  //     : color === "secondary"
  //       ? "secondary"
  //       : "primary";
  const buttonClassName = `${colorClass} ${sizeClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
