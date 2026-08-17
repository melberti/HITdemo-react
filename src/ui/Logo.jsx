import { Link } from "react-router";
import { useDarkMode } from "../context/DarkModeContex";
import {  } from 'react-router'

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <section className="logo item flex items-end gap-4 p-5">
      <Link to="/">
      {isDarkMode ? (
        <img src="./logo.png" width="125px" />
      ) : (
        <img src="./logo_inverse.png" width="125px" />
      )}
</Link>
      <span>Hear. There. Everywhere.</span>
    </section>
  );
}

export default Logo;
