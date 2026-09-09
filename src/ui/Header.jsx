import { useNavigate, Link } from "react-router";
import { CgDarkMode } from "react-icons/cg";
import { useDarkMode } from "../context/DarkModeContex";
import { useUser } from "../features/authentication/useUser";
import { useSignOut } from "../features/authentication/useSignOut";
import { defaultDashboardUrl } from "../utilities/utilities";
import Button from "./Button";
import ScreenSizeLogger from "./ScreenSizeLogger";
import Modal from "./Modal";
import About from "./About";

function Header() {
  const { toggleDarkMode } = useDarkMode();
  const { user } = useUser();
  const { signOut } = useSignOut();
  const navigate = useNavigate();

  return (
    <header>
      <Modal>
        <Modal.Open opens="about">
          <Button className="dashboard mr-auto" type="button" size="small">
            About This Demo
          </Button>
        </Modal.Open>
        <Modal.Window name="about">
          <About />
        </Modal.Window>
      </Modal>

      <div>
        <ScreenSizeLogger show={false} />
      </div>
      <div className="m-0 p-0" title="Toggle DarkMode">
        <CgDarkMode size={40} onClick={toggleDarkMode} />
      </div>

      {user ? (
        <>
          <div>Welcome, {user.user_metadata.firstName}!</div>
          <div className="border-r-2 border-white pr-4">
            <Link to={defaultDashboardUrl} className="header">
              My Dashboard
            </Link>
          </div>
          <div>
            <Link to="/profile" className="header">
              Profile
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
