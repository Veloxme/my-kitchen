import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class Units extends React.Component {
  state = {
    loading: false,
    error: null,
    units: [],
    name: "",
    prefix: "",
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
        "http://3.219.6.57:5000/system/units",
        requestOptions
      );
      const unit = await response.json();
      const units = unit.content.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      this.setState({
        loading: false,
        units,
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
    if (this.state.name === "" || this.state.prefix === "") {
      swal("You need to fill all the fields!", {
        buttons: false,
        timer: 3000,
      });
    } else {
      this.setState({ loading: true });
      let fd = new FormData();
      fd.append("name", this.state.name);
      fd.append("prefix", this.state.prefix);
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
          "http://3.219.6.57:5000/admin/unit",
          requestOptions
        );
        this.setState({ loading: false });
        const respuesta = await response.json();
        document.getElementById("name").value = "";
        document.getElementById("prefix").value = "";
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
          {this.state.loading ? (
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
          ) : (
            <ul className="list-group">
              {this.state.units.map((x) => (
                <li className="list-group-item" key={x.id}>
                  {x.name}
                  <span className="badge badge-warning badge-pill">
                    {x.prefix}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card col">
          <h1 className="card-header">Units</h1>
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
            <div className="form-group col">
              <label>Prefix</label>
              <input
                type="text"
                className="form-control"
                id="prefix"
                name="prefix"
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
