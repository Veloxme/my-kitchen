import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import PublicRoute from "../Withoutauth";

import NavColumn from "../componentes/NavColumn";
import Products from "../componentes/Products";

export default class Forms extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="row">
          <div className="col-1">
            <NavColumn />
          </div>
          <div className="col">
            <Switch>
              <PublicRoute exact path="/Index/Poducts" component={Products} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
