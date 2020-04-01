import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import PrivateRoute from "../auth";

import NavColumn from "../componentes/NavColumn";
import Recipes from "../componentes/Recipes";
import Products from "../componentes/Products";
import Ingredient from "../componentes/Ingredient";
import Procedure from "../componentes/Procedure";
import MenuRecipes from "../componentes/MenuRecipes";
import MenuProducts from "../componentes/MenuProducts";
import ListaRecipes from "../componentes/ListaRecipes";
import ListaProducts from "../componentes/ListaProducts";
import EditProduct from "../componentes/EditProduct";
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
              <PrivateRoute exact path="/Index/Products" component={Products} />
              <PrivateRoute exact path="/Index/Recipes" component={Recipes} />
              <PrivateRoute
                exact
                path="/Index/MenuProducts"
                component={MenuProducts}
              />
              <PrivateRoute
                exact
                path="/Index/ListaProducts"
                component={ListaProducts}
              />
              <PrivateRoute
                exact
                path="/Index/EditProduct/:id"
                component={EditProduct}
              />
              <PrivateRoute
                exact
                path="/Index/MenuRecipes"
                component={MenuRecipes}
              />
              <PrivateRoute
                exact
                path="/Index/ListaRecipes"
                component={ListaRecipes}
              />
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
