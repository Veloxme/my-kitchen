import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class Recipes extends React.Component {
  state = {
    loading: false,
    error: null,
    difficulties: [],
    tags: [],
    name: "",
    difficulty: "",
    time: "",
    calories: ""
  };
  componentDidMount() {
    this.fetchCaregories();
  }

  fetchCaregories = async () => {
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
        "http://3.219.6.57:5000/system/difficulties",
        requestOptions
      );
      const difficul = await response.json();
      const difficulties = difficul.content;
      this.setState({
        loading: false,
        difficulties
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
    try {
      const response = await fetch(
        "http://3.219.6.57:5000/system/tags",
        requestOptions
      );
      const tag = await response.json();
      const tags = tag.content;
      this.setState({
        loading: false,
        tags
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
    let combo = document.getElementById("difficulty").value;
    this.setState({ difficulty: combo });
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  fileSelectedHandler = e => {
    this.setState({ image: e.target.files[0] });
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    let fd = new FormData();
    fd.append("name", this.state.name);
    fd.append("productCategory_id", this.state.category);
    fd.append("image", this.state.image);
    const bearer = "Bearer " + localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      body: fd,
      withCredentials: true,
      headers: {
        Authorization: bearer
      }
    };
    try {
      const response = await fetch(
        "http://3.219.6.57:5000/admin/product",
        requestOptions
      );
      const json = await response.json();
      let id = json.content.id;
      let formdata = new FormData();
      formdata.append("presentation", this.state.presentation);
      formdata.append("equivalence", this.state.equivalence);
      formdata.append("unit_id", this.state.unit);
      formdata.append("step", this.state.steps);
      formdata.append("step_unit_id", this.state.unit);
      formdata.append("negligible", this.state.negligible);
      formdata.append("expiration", this.state.expiration);
      const Options = {
        method: "POST",
        body: formdata,
        withCredentials: true,
        headers: {
          Authorization: bearer
        }
      };
      const respuesta = await fetch(
        `http://3.219.6.57:5000/admin/product/${id}/subproduct`,
        Options
      );
      const back = await respuesta.json();
      console.log(back);
      this.setState({ loading: false });
      swal("Hecho!", "El producto se a guardado con exito!", "success");
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
    const { loading } = this.state;
    if (this.state.error) {
      return <p className="text-center">error...</p>;
    }
    return (
      <div className="card mx-auto mt-4 mb-1 col-md-6">
        <h1 className=" card-header ">Recipes</h1>
        <form className=" card-body " onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <label>Difficulty</label>
            <select
              className="form-control"
              id="difficulty"
              name="difficulty"
              onChange={this.changeHandler}
            >
              {this.state.difficulties.map(dif => (
                <option key={dif.id} value={dif.id}>
                  {dif.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="number"
              className="form-control"
              id="time"
              name="time"
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <label>Calories</label>
            <input
              type="number"
              className="form-control"
              id="calories"
              name="calories"
              onChange={this.changeHandler}
            />
          </div>
          <div className="row">
            <label className="col-12">Unit</label>
            {this.state.tags.map(tag => (
              <div key={tag.id} className="form-check form-check-inline col">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="unit"
                  name="unit"
                  value={tag.id}
                  onChange={this.changeHandler}
                />
                <label>{tag.name}</label>
              </div>
            ))}
          </div>

          <button className="btn btn-outline-success" disabled={loading}>
            {loading && <i className="fa fa-refresh fa-spin"></i>}Guardar
          </button>
        </form>
      </div>
    );
  }
}
