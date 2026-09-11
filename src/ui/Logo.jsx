import { Link } from "react-router";
import { useDarkMode } from "../context/DarkModeContex";
import {} from "react-router";

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <section className="logo">
      <Link to="/">
        {isDarkMode ? (
          <img src="./logo.png" width="90px" height="85" />
        ) : (
          <img src="./logo_inverse.png" width="90px" height="85" />
        )}
      </Link>
      <Link to="/">Hear. There. Everywhere.</Link>
    </section>
  );
}

export default Logo;
