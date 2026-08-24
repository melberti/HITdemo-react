import { CgDarkMode } from "react-icons/cg";
import { useDarkMode } from "../context/DarkModeContex";
import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";
import { useSignOut } from "../features/authentication/useSignOut";
import Button from "./Button";
import ScreenSizeLogger from "./ScreenSizeLogger";

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, isLoading } = useUser();
  const { signOut } = useSignOut();
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <ScreenSizeLogger />
      </div>
      <div className="m-0 p-0" title="Toggle DarkMode">
        <CgDarkMode size={40} onClick={toggleDarkMode} />
      </div>

      {user ? (
        <>
          <div>{user.user_metadata.firstName}</div>
          <Button size="small" type="primary" onClick={signOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button size="small" type="primary" onClick={() => navigate("/signin")}>
          Sign In
        </Button>
      )}
    </header>
  );
}

export default Header;
