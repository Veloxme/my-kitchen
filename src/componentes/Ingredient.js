import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class Ingredient extends React.Component {
  state = {
    loading: false,
    error: null,
    ingredients: [],
    ingredient: "",
    quantity: "",
    identifi: "",
    unit_id: "",
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
        "http://3.219.6.57:5000/system/products/details",
        requestOptions
      );
      const ingre = await response.json();
      const ingredients = ingre.content;
      console.log(ingredients);
      this.setState({
        loading: false,
        ingredients,
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
  changeHandler = async (e) => {
    this.setState({ [e.target.name]: e.target.value });
    for (var i = 0; i < this.state.ingredients.length; i++) {
      if (this.state.ingredients[i].id === parseInt(e.target.value, 10)) {
        this.setState({
          unit_id: this.state.ingredients[i].subproducts[0].unitId,
        });
      }
    }
  };
  prueba = (e) => {
    e.preventDefault();
    this.props.history.push(`/Index/Recipes/${this.state.identidicador}`);
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let fd = new FormData();
    fd.append("product_id", this.state.ingredient);
    fd.append("quantity", this.state.quantity);
    fd.append("unit_id", this.state.unit_id);
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
        `http://3.219.6.57:5000/admin/recipe/${this.state.identifi}/ingredient`,
        requestOptions
      );

      this.setState({ loading: false });
      swal("Hecho!", "El producto se a guardado con exito!", "success");
      document.getElementById("ingredient").value = "";
      document.getElementById("quantity").value = "";
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
  procedure = (e) => {
    this.props.history.push(`/Index/Recipes/${this.state.identifi}/Procedure`);
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
            <label>New ingredient</label>
            <select
              className="form-control"
              id="ingredient"
              name="ingredient"
              onChange={this.changeHandler}
            >
              {this.state.ingredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
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
              onChange={this.changeHandler}
            />
          </div>
          <button
            className="btn btn-outline-success float-right"
            disabled={loading}
          >
            {loading && <i className="fa fa-refresh fa-spin"></i>}Siguiente
          </button>
        </form>
        <button
          className="btn btn-outline-success mb-3"
          onClick={this.procedure}
        >
          procedure
        </button>
      </div>
    );
  }
}
