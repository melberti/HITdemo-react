function Button({ size = "normal", type = "primary", onClick, children }) {
  const sizeClass = size === "small" ? "small" : "normal";
  const typeClass = type === "secondary" ? "secondary" : "primary";
  const className = `${typeClass} ${sizeClass}`;

  function handleClick(){

//console.log('button clicked');

  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
