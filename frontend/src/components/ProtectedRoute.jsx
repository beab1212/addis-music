import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    // return navigate("/signin")
    return <Navigate to="/signin" replace />
  }

  return children;
};

export default ProtectedRoute;
