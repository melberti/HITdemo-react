import { useNavigate, Link } from "react-router";
import { CgDarkMode } from "react-icons/cg";
import { useDarkMode } from "../context/DarkModeContex";
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
      <div className="mr-auto" id="left">
        About Hear There Everywhere.
      </div>
      <div>
        <ScreenSizeLogger show={false} />
      </div>
      <div className="m-0 p-0" title="Toggle DarkMode">
        <CgDarkMode size={40} onClick={toggleDarkMode} />
      </div>

      {user ? (
        <>
          <div>Welcome, {user.user_metadata.firstName}!</div>
          <div>
            <Link to="/dashboard" className="dashboard">
              View Dashboard
            </Link>
          </div>
          <Button size="small" color="primary" onClick={signOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button
          size="small"
          color="primary"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </Button>
      )}
    </header>
  );
}

export default Header;
