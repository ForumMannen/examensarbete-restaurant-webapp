import { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

interface PrivateRouteProps {
    element: ReactElement;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element, ...rest }) => {
  const { loginAdmin } = useAdminContext();  
  return loginAdmin ? (
      <Route {...rest} element={Element} /> ) : (
            <Navigate to="/login" replace={true} />
          )
        }

export default PrivateRoute;