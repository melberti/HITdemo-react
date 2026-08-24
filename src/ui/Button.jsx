function Button({ size = "normal", type = "primary", onClick, children }) {
  const sizeClass = size === "small" ? "small" : "normal";
  const typeClass =
    type === "neutral"
      ? "neutral"
      : type === "secondary"
        ? "secondary"
        : "primary";
  const className = `${typeClass} ${sizeClass}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
