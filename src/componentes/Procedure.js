import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class Procedure extends React.Component {
  state = {
    loading: false,
    error: null,
    step: "",
    description: "",
    ingredients: [],
    ingredient: "",
    identifi: "",
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
        Authorization: bearer,
      },
    };
    try {
      const response = await fetch(
        `http://3.219.6.57:5000/system/recipes/${id}`,
        requestOptions
      );
      const ingre = await response.json();
      const x = ingre.content.group[0].ingredients;
      if (ingre.content.procedure) {
        this.setState({
          loading: false,
          ingredients: x,
          step: ingre.content.procedure.length + 1,
        });
      } else {
        this.setState({
          loading: false,
          ingredients: x,
          step: 1,
        });
      }

      let combo = document.getElementById("ingredient").value;
      this.setState({ ingredient: combo });
      document.getElementById("step").value = this.state.step;
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
  prueba = (e) => {
    e.preventDefault();
    let y = this.state.step;
    y += 1;
    console.log(y);
    this.setState({
      step: y,
    });
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
      method: "POST",
      body: fd,
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    };
    try {
      await fetch(
        `http://3.219.6.57:5000/admin/recipe/${this.state.identifi}/procedure`,
        requestOptions
      );

      this.setState({ loading: false });
      swal("Hecho!", "El paso se a guardado con exito!", "success");
      document.getElementById("description").value = "";
      let y = this.state.step;
      y += 1;
      this.setState({
        step: y,
      });
      document.getElementById("step").value = this.state.step;
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
  procedure = async (e) => {
    this.setState({ loading: true });
    let fd = new FormData();
    fd.append("step_number", this.state.step);
    fd.append("description", this.state.description);
    fd.append("ingredient_id", this.state.ingredient);
    const bearer = "Bearer " + localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      body: fd,
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    };

    try {
      await fetch(
        `http://3.219.6.57:5000/admin/recipe/${this.state.identifi}/procedure`,
        requestOptions
      );

      this.setState({ loading: false });
      swal("Hecho!", "El paso se a guardado con exito!", "success");
      this.props.history.push(`/Index/MenuRecipes`);
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
  render() {
    const { loading, input } = this.state;
    if (this.state.error) {
      return <p className="text-center">error...</p>;
    }
    return (
      <div className="card mx-auto mt-4 mb-1 col-md-6">
        <h1 className=" card-header ">Recipes</h1>
        <form className=" card-body " onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Step</label>
            <input
              type="text"
              className="form-control"
              id="step"
              name="step"
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
                <option key={ing.id} value={ing.id}>
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
              onChange={this.changeHandler}
            />
          </div>
          <button
            className="btn btn-outline-success float-right"
            disabled={loading}
          >
            {loading && <i className="fa fa-refresh fa-spin"></i>}Next
          </button>
        </form>
        <button
          className="btn btn-outline-success mb-3"
          onClick={this.procedure}
        >
          Save
        </button>
      </div>
    );
  }
}
