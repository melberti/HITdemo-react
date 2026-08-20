import { CgDarkMode } from "react-icons/cg";
import { useDarkMode } from "../context/DarkModeContex";
import { Link } from "react-router";
import { useUser } from "../features/authentication/useUser";
import Button from "./Button";

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, isLoading } = useUser();

  console.log("header user:", user);

  return (
    <header className="inline-flex items-center px-5">
      <div className="m-0 p-0" title="Toggle DarkMode">
        <CgDarkMode size={40} onClick={toggleDarkMode} />
      </div>

      {user ? (
        <>
          {" "}
          <div>{user.email} </div>{" "}
          <Button size="small" type="primary">
            Sign Out
          </Button>
        </>
      ) : (
        <Link to="/signin" className="button small primary">
          Sign In
        </Link>
      )}
    </header>
  );
}

export default Header;
