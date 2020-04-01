import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class ListaRecipes extends React.Component {
  state = {
    loading: false,
    error: null,
    Recipes: []
  };
  componentDidMount() {
    this.fetchCaregories();
  }

  fetchCaregories = async () => {
    const id = this.props.match.params.id;
    this.setState({ identifi: id });
    this.setState({ loading: true, error: null });
    const bearer =
      "Bearer " +
      "S<yus%;|ZO'1k/ISa^H+6_,!:&$0Z+kM9)B?;f`=]=p%q!)uJ^x_!F!7!LL&F|B";
    const requestOptions = {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: bearer
      }
    };
    try {
      const response = await fetch(
        `http://3.219.6.57:5000/system/recipes?limit=50&offset=0`,
        requestOptions
      );
      const reci = await response.json();
      const recipes = reci.content;
      this.setState({
        loading: false,
        Recipes: recipes
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
      swal({
        icon: "error"
      });
    }
  };
  put = e => {};
  delete = async e => {
    this.setState({ loading: true });
    const bearer = "Bearer " + localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: bearer
      }
    };
    try {
      await fetch(`http://3.219.6.57:5000/admin/recipe/${e}`, requestOptions);

      this.setState({ loading: false });
      swal("Hecho!", "La receta se a eliminado con exito!", "success");
      this.fetchCaregories();
    } catch (err) {
      this.setState({
        loading: false
      });
      swal({
        icon: "error"
      });
      console.log(err);
    }
  };
  render() {
    return (
      <div className="container mt-3">
        <ul className="list-group">
          {this.state.Recipes.map(rec => (
            <li className="list-group-item" key={rec.id}>
              {rec.name}
              <button
                onClick={() => this.delete(rec.id)}
                className="badge badge-danger badge-pill float-right"
              >
                Delete
              </button>
              <button
                onClick={this.put}
                className="badge badge-warning badge-pill float-right mr-3"
              >
                Modify
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
