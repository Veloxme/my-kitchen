import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

export default class MenuMod extends React.Component {
  state = {
    loading: false,
    error: null,
    producto: [],
    id: ""
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ loading: true, error: null, id });
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-3">Modify recipe</h1>
        <div className="row">
          <Link
            to={`/Index/ModRecipe/${this.state.id}`}
            className=" p-5 m-2 bg-orangeKitchen rounded col"
          >
            <h1 className="text-center">Recipe</h1>
          </Link>
          <Link
            to={`/Index/ModTags/${this.state.id}`}
            className=" p-5 m-2 bg-orangeKitchen rounded col "
          >
            <h1 className="text-center">Tags</h1>
          </Link>
        </div>
        <div className="row">
          <Link
            to={`/Index/ModIngredient/${this.state.id}`}
            className=" p-5 m-2 bg-orangeKitchen rounded col"
          >
            <h1 className="text-center">Ingredient</h1>
          </Link>
          <Link
            to={`/Index/ModProcedure/${this.state.id}`}
            className=" p-5 m-2 bg-orangeKitchen rounded col "
          >
            <h1 className="text-center">Procedure</h1>
          </Link>
        </div>
      </div>
    );
  }
}
