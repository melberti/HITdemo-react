import { Link } from "react-router";
import { useDarkMode } from "../context/DarkModeContex";
import {} from "react-router";

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <section className="logo">
      <Link to="/">
        {isDarkMode ? (
          <img src="./logo.png" width="125px" height="118" />
        ) : (
          <img src="./logo_inverse.png" width="125px" height="118" />
        )}
      </Link>
      <span>Hear. There. Everywhere.</span>
    </section>
  );
}

export default Logo;
