import { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
    element: ReactElement;
    isAuthenticated: boolean;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element, isAuthenticated, ...rest }) => {
    return (
      <Route
        {...rest}
        element={
          isAuthenticated ? (
            Element
          ) : (
            <Navigate to="/login" replace={true} />
          )
        }
      />
    );
  };

export default PrivateRoute;