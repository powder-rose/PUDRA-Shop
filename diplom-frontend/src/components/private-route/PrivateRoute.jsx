import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children, roles }) => {
  const { id, roleId, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return null;
  }

  if (!id) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(Number(roleId))) {
    return <Navigate to="/" replace />;
  }

  return children;
};
