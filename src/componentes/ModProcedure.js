import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class ModProcedure extends React.Component {
  state = {
    loading: false,
    error: null,
    producto: [],
    ingredients: [],
    id: "",
    procedure: [],
    ingredient: "",
    step: "",
    description: "",
    recipeProcedure_id: "",
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
        procedure: producto.content.procedure,
        ingredients: producto.content.group[0].ingredients,
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
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let fd = new FormData();
    fd.append("step_number", this.state.step);
    fd.append("description", this.state.description);
    fd.append("ingredient_id", this.state.ingredient);
    const bearer = "Bearer " + localStorage.getItem("token");
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
        `http://3.219.6.57:5000/admin/recipe/${this.state.id}/procedure/${this.state.recipeProcedure_id}`,
        requestOptions
      );
      const json = await response.json();
      swal("Hecho!", `${json.details}`, "success");
      this.setState({ loading: false });
      document.getElementById("description").value = "";
      document.getElementById("step").value = "";
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
        `http://3.219.6.57:5000/admin/recipe/${this.state.id}/procedure/${e}`,
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
    for (var i = 0; i < this.state.ingredients.length; i++) {
      if (this.state.ingredients[i].id === e.ingredientId) {
        document.getElementById(
          this.state.ingredients[i].product.name
        ).selected = true;
      }
    }
    this.setState({
      description: e.description,
      step: e.stepNumber,
      recipeProcedure_id: e.id,
      ingredient: e.ingredientId,
    });
  };
  procedures = () => {
    this.props.history.push(`/Index/Recipes/${this.state.id}/Procedure`);
  };
  render() {
    const { loading } = this.state;
    if (this.state.error) {
      return <p className="text-center">error...</p>;
    }
    return (
      <div>
        {this.state.loading && (
          <div className="progress m-3">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "75%" }}
            ></div>
          </div>
        )}
        <div className="m-3 row">
          <div className="col">
            <button
              type="button"
              className="btn btn-secondary btn-lg mb-3"
              onClick={this.procedures}
            >
              New procedure
            </button>
            <ul className="list-group">
              {this.state.procedure.map((x) => (
                <li
                  className="list-group-item"
                  key={x.id}
                  onClick={() => this.enviar(x)}
                >
                  <span className="badge badge-warning badge-pill mr-2">
                    {x.stepNumber}
                  </span>
                  {x.description}
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
            <h1 className="card-header">Procedure</h1>
            <form className="card-body" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Step</label>
                <input
                  type="text"
                  className="form-control"
                  id="step"
                  name="step"
                  value={this.state.step}
                  onChange={this.changeHandler}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>ingredient</label>
                <select
                  className="form-control"
                  id="ingredient"
                  name="ingredient"
                  onChange={this.changeHandler}
                >
                  {this.state.ingredients.map((ing) => (
                    <option key={ing.id} id={ing.product.name} value={ing.id}>
                      {ing.product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={this.state.description}
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
      </div>
    );
  }
}
