import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import PrivateRoute from "./auth";
import PublicRoute from "./Withoutauth";

import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forms from "./pages/Forms";
import Sprint from "./pages/Sprint";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <PublicRoute exact path="/" component={LandingPage} />
          <PublicRoute exact path="/Login" component={Login} />
          <PublicRoute exact path="/Register" component={Register} />
          <PrivateRoute exact path="/Index" component={Forms} />
          <PublicRoute exact path="/Sprint" component={Sprint} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
