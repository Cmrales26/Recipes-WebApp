import { Navigate, Outlet } from "react-router-dom";
import { UseUser } from "./context/user.context";

const Protectedroute = () => {
  const { loading, isAuth } = UseUser();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuth && !loading) {
    return <Navigate to="/login" replace />;
  }
  console.log(isAuth, loading);

  return <Outlet />;
};

export default Protectedroute;
