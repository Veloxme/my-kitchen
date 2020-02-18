import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./auth";
import PublicRoute from "./Withoutauth";

import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PublicRoute exact path="/Login" component={Login} />
          <PublicRoute exact path="/Register" component={Register} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
