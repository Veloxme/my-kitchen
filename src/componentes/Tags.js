import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class Tags extends React.Component {
  state = {
    loading: false,
    error: null,
    tags: [],
    name: "",
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
        "http://3.219.6.57:5000/system/tags",
        requestOptions
      );
      const tag = await response.json();
      const tags = tag.content;
      this.setState({
        loading: false,
        tags,
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
    if (this.state.name === "") {
      swal("You need to fill the field!", {
        buttons: false,
        timer: 3000,
      });
    } else {
      this.setState({ loading: true });
      let fd = new FormData();
      fd.append("name", this.state.name);
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
          "http://3.219.6.57:5000/admin/tag",
          requestOptions
        );
        const respuesta = await response.json();
        this.setState({ loading: false });
        document.getElementById("name").value = "";
        swal("Done!", `${respuesta.details}`, "success");
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
    }
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
            {this.state.tags.map((x) => (
              <li className="list-group-item" key={x.id}>
                {x.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="card col">
          <h1 className="card-header">Tags</h1>
          <form className="card-body" onSubmit={this.handleSubmit}>
            <div className="form-group col">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={this.changeHandler}
              />
            </div>
            <button
              className="btn btn-outline-success float-right"
              disabled={loading}
            >
              {loading && <i className="fa fa-refresh fa-spin"></i>}Guardar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
