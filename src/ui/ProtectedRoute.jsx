import { Outlet, Navigate } from "react-router";
import { useUser } from "../features/authentication/useUser";

function ProtectedRoute() {
  // This checks if the user is logged in
  const { user, isLoading } = useUser();

  if (isLoading) return null;
  const isAuth = user?.role === "authenticated";
  return isAuth ? <Outlet /> : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
