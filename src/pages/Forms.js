import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import PrivateRoute from "../auth";

import NavColumn from "../componentes/NavColumn";
import Recipes from "../componentes/Recipes";
import Products from "../componentes/Products";
import Ingredient from "../componentes/Ingredient";
import Procedure from "../componentes/Procedure";
export default class Forms extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="row">
          <div className="col-sm-2 col-md-1">
            <NavColumn />
          </div>
          <div className="col">
            <Switch>
              <PrivateRoute exact path="/Index/Poducts" component={Products} />
              <PrivateRoute exact path="/Index/Recipes" component={Recipes} />
              <PrivateRoute
                exact
                path="/Index/Recipes/:id/Ingredients"
                component={Ingredient}
              />
              <PrivateRoute
                exact
                path="/Index/Recipes/:id/Procedure"
                component={Procedure}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
