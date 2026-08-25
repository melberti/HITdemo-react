function Button({
  size = "normal",
  color = "primary",
  onClick,
  children,
  type = "submit",
}) {
  const sizeClass = size === "small" ? "small" : "normal";
  const colorClass =
    color === "neutral"
      ? "neutral"
      : color === "secondary"
        ? "secondary"
        : "primary";
  const className = `${colorClass} ${sizeClass}`;

  return (
    <button
      type={type}
      className={className}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
