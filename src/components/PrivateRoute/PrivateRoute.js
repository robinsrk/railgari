import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { UserContext } from "../../App";
const PrivateRoute = ({ children, ...rest }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          loggedInUser.isSignedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/form",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};
export default PrivateRoute;