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
    calories: "",
    tag: [],
    image: "",
    identidicador: 15,
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
        Authorization: bearer,
      },
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
        difficulties,
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
        "http://3.219.6.57:5000/system/tags",
        requestOptions
      );
      const tag = await response.json();
      const tags = tag.content;
      this.setState({
        loading: false,
        tags,
      });
      let combo = document.getElementById("difficulty").value;
      this.setState({ difficulty: combo });
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
  fileSelectedHandler = (e) => {
    this.setState({ image: e.target.files[0] });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  pushHandler = (e) => {
    this.state.tag.push(e.target.value);
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let fd = new FormData();
    fd.append("name", this.state.name);
    fd.append("difficulty_id", this.state.difficulty);
    fd.append("image", this.state.image);
    fd.append("time", this.state.time);
    fd.append("calories", this.state.calories);
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
      const response = await fetch(
        "http://3.219.6.57:5000/admin/recipe",
        requestOptions
      );
      const json = await response.json();
      let id = json.content.id;
      this.setState({ identidicador: id });
      let formdata = new FormData();
      const Options = {
        method: "POST",
        body: formdata,
        withCredentials: true,
        headers: {
          Authorization: bearer,
        },
      };
      this.state.tag.map(async (tags) => {
        formdata.append("tag_id", tags);
        await fetch(`http://3.219.6.57:5000/admin/recipe/${id}/tag`, Options);
      });
      this.setState({ loading: false });
      swal("Hecho!", "El producto se a guardado con exito!", "success");
      this.props.history.push(`/Index/Recipes/${id}/Ingredients`);
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
  prueba = (e) => {
    e.preventDefault();
    this.props.history.push(
      `/Index/Recipes/${this.state.identidicador}/Ingredients`
    );
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
            <label className="col-12">Tags</label>
            {this.state.tags.map((tag) => (
              <div key={tag.id} className="form-check form-check-inline col">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="tag"
                  name="tag"
                  value={tag.id}
                  onChange={this.pushHandler}
                />
                <label>{tag.name}</label>
              </div>
            ))}
          </div>
          <button
            className="btn btn-outline-success float-right"
            disabled={loading}
          >
            {loading && <i className="fa fa-refresh fa-spin"></i>}Siguiente
          </button>
        </form>
      </div>
    );
  }
}
