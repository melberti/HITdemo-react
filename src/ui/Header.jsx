import { CgDarkMode } from "react-icons/cg";
import { useDarkMode } from "../context/DarkModeContex";
import Button from "./Button";

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="inline-flex items-center px-5">
      <div className="m-0 p-0" title="Toggle DarkMode">
        <CgDarkMode size={40} onClick={toggleDarkMode} />
      </div>
      <div>Hello $$$$$!</div>
      <Button size="small" type="primary">
        Sign In
      </Button>
      <Button size="small" type="primary">
        Sign Out
      </Button>
    </header>
  );
}

export default Header;
