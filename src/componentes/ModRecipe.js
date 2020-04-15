import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class ModRecipe extends React.Component {
  state = {
    loading: false,
    error: null,
    difficulties: [],
    producto: [],
    name: "",
    difficulty: "",
    time: "",
    calories: "",
    image: "",
    id: "",
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
        "http://3.219.6.57:5000/system/difficulties",
        requestOptions
      );
      const difficul = await response.json();
      this.setState({
        loading: false,
        difficulties: difficul.content,
      });
      document.getElementById(this.state.producto.difficultyId).selected =
        "selected";
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
      swal({
        icon: "error",
      });
    }

    this.setState({
      name: this.state.producto.name,
      difficulty: this.state.producto.difficultyId,
      time: this.state.producto.time,
      calories: this.state.producto.calories,
    });
  };
  fileSelectedHandler = (e) => {
    this.setState({ image: e.target.files[0] });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let fd = new FormData();
    fd.append("name", this.state.name);
    fd.append("difficulty_id", this.state.difficulty);
    var archivoBlob = new Blob([this.state.image], { type: "file" });
    fd.append("image", archivoBlob);
    fd.append("time", this.state.time);
    fd.append("calories", this.state.calories);
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
        `http://3.219.6.57:5000/admin/recipe/${this.state.id}`,
        requestOptions
      );
      const json = await response.json();
      this.setState({ loading: false });
      swal("Hecho!", `${json.details}`, "success");
      this.props.history.push(`/Index/ListaRecipes`);
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
        <div className="card mx-auto mt-4 mb-1 col-md-6">
          <h1 className=" card-header ">Recipe "{this.state.producto.name}"</h1>
          <form className=" card-body " onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="file"
                  className="custom-file-input"
                  id="file"
                  onChange={this.fileSelectedHandler}
                />
                <label className="custom-file-label" htmlFor="file">
                  Choose file
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Difficulty</label>
              <select
                className="form-control"
                id="difficulty"
                name="difficulty"
                onChange={this.changeHandler}
              >
                {this.state.difficulties.map((dif) => (
                  <option key={dif.id} id={dif.id} value={dif.id}>
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
                value={this.state.time}
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
                value={this.state.calories}
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
