import { Navigate, Outlet, useParams } from "react-router-dom";
import { UseUser } from "./context/user.context";

const Protectedroute = () => {
  const params = useParams();

  const { loading, isAuth, user } = UseUser();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuth && !loading) {
    return <Navigate to="/login" replace />;
  }

  if (params.username) {
    if (user.username !== params.username) {
      return <Navigate to="/home" replace />;
    }
  }
  return <Outlet />;
};

export default Protectedroute;
