import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class ModIngredient extends React.Component {
  state = {
    loading: false,
    error: null,
    producto: [],
    ingredients: [],
    id: "",
    group: [],
    ingredient: "",
    quantity: "",
    ingredient_id: "",
    unit_id: "",
  };
  componentDidMount() {
    this.fetchCaregories();
  }

  fetchCaregories = async () => {
    const id = this.props.match.params.id;
    this.setState({ loading: true, error: null, id });
    const bearer =
      "Bearer " +
      "S<yus%;|ZO'1k/ISa^H+6_,!:&$0Z+kM9)B?;f`=]=p%q!)uJ^x_!F!7!LL&F|B";
    const requestOptions = {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    };
    try {
      const response = await fetch(
        `http://3.219.6.57:5000/system/recipes/${id}`,
        requestOptions
      );
      const producto = await response.json();

      this.setState({
        loading: false,
        producto: producto.content,
        group: producto.content.group[0].ingredients,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
      swal({
        icon: "error",
      });
    }
    try {
      const response = await fetch(
        "http://3.219.6.57:5000/system/products/details",
        requestOptions
      );
      const ingre = await response.json();
      this.setState({
        loading: false,
        ingredients: ingre.content.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }),
      });
      let combo = document.getElementById("ingredient").value;
      this.setState({ ingredient: combo });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
      swal({
        icon: "error",
      });
    }
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const bearer = "Bearer " + localStorage.getItem("token");
    let fd = new FormData();
    fd.append("product_id", this.state.ingredient);
    fd.append("quantity", this.state.quantity);
    fd.append("unit_id", this.state.unit_id);
    const requestOptions = {
      method: "PUT",
      body: fd,
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    };
    try {
      const response = await fetch(
        `http://3.219.6.57:5000/admin/recipe/${this.state.id}/ingredient/${this.state.ingredient_id}`,
        requestOptions
      );
      this.setState({ loading: false });
      const json = await response.json();
      swal("Hecho!", `${json.details}`, "success");
      this.fetchCaregories();
    } catch (err) {
      this.setState({
        loading: false,
      });
      swal({
        icon: "error",
      });
      console.log(err);
    }
  };
  delete = async (e) => {
    this.setState({ loading: true });
    const bearer = "Bearer " + localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    };
    try {
      const response = await fetch(
        `http://3.219.6.57:5000/admin/recipe/${this.state.id}/ingredient/${e}`,
        requestOptions
      );
      const json = await response.json();
      this.setState({ loading: false });
      swal("Hecho!", `${json.details}`, "success");
      this.fetchCaregories();
    } catch (err) {
      this.setState({
        loading: false,
      });
      swal({
        icon: "error",
      });
      console.log(err);
    }
  };
  enviar = (e) => {
    document.getElementById(e.product.name).selected = true;
    this.setState({
      quantity: e.quantity,
      ingredient: e.product.id,
      ingredient_id: e.id,
      unit_id: e.unitId,
    });
  };
  render() {
    const { loading } = this.state;
    if (this.state.error) {
      return <p className="text-center">error...</p>;
    }
    return (
      <div className="m-3 row">
        <div className="col">
          <ul className="list-group">
            {this.state.group.map((x) => (
              <li
                className="list-group-item"
                key={x.id}
                onClick={() => this.enviar(x)}
              >
                <span className="badge badge-warning badge-pill mr-2">
                  {x.quantity}
                </span>
                {x.product.name}
                <button
                  onClick={() => this.delete(x.id)}
                  className="badge badge-danger badge-pill float-right"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card col">
          <h1 className="card-header">ingredients</h1>
          <form className="card-body" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>New ingredient</label>
              <select
                className="form-control"
                id="ingredient"
                name="ingredient"
                onChange={this.changeHandler}
              >
                {this.state.ingredients.map((ing) => (
                  <option key={ing.id} id={ing.name} value={ing.id}>
                    {ing.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={this.state.quantity}
                onChange={this.changeHandler}
              />
            </div>
            <button
              className="btn btn-outline-success float-right"
              disabled={loading}
            >
              {loading && <i className="fa fa-refresh fa-spin"></i>}Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
