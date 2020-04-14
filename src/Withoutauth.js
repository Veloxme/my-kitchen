import React from "react";

import { Route, Redirect } from "react-router-dom";

const notAuth = () => {
  if (localStorage.getItem("token") === null) {
    return true;
  }
  return false;
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        notAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/Index",
              state: { message: "Usuário no autorizado" },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
