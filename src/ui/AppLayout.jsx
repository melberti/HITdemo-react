import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Logo from "./Logo";

function AppLayout() {
  return (
    <div>
      <Header />
      <Logo />

      <main className="grow px-5 py-7">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
