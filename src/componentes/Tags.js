import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class Tags extends React.Component {
  state = {
    loading: false,
    error: null,
    tags: [],
    mostrar: [],
    name: "",
    inicio: 0,
    final: 10,
    numero: 0,
    tope: 0,
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
      const tags = tag.content.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      const numero = tags.length - 10;
      this.setState({
        loading: false,
        tags,
        numero,
      });
      let algo = [];
      for (var i = this.state.inicio; i < this.state.final; i++) {
        algo.push(this.state.tags[i]);
      }
      this.setState({
        mostrar: algo,
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
  paginationplus = () => {
    let algo = [];
    if (this.state.numero >= 10) {
      let inicio = this.state.inicio + 10;
      let final = this.state.final + 10;
      let restar = this.state.numero - 10;
      this.setState({
        inicio,
        final,
        numero: restar,
      });

      for (var i = inicio; i < final; i++) {
        algo.push(this.state.tags[i]);
      }
      this.setState({
        mostrar: algo,
      });
    } else if (this.state.tope === 1 || this.state.numero === 0) {
      swal("It can not!", {
        buttons: false,
        timer: 2000,
      });
    } else {
      let inicio = this.state.inicio + 10;
      let final = this.state.final + this.state.numero;
      this.setState({
        inicio,
        final,
        tope: 1,
      });

      for (var x = inicio; x < final; x++) {
        algo.push(this.state.tags[x]);
      }
      this.setState({
        mostrar: algo,
      });
    }
  };
  paginationmenus = () => {
    if (this.state.inicio > 0) {
      if (this.state.tope === 1) {
        let algo = [];
        let inicio = this.state.inicio - 10;
        let final = this.state.final - this.state.numero;
        this.setState({
          inicio,
          final,
          tope: 0,
        });
        for (var i = inicio; i < final; i++) {
          algo.push(this.state.tags[i]);
        }
        this.setState({
          mostrar: algo,
        });
      } else {
        let algo = [];
        let inicio = this.state.inicio - 10;
        let final = this.state.final - 10;
        let numero = this.state.numero + 10;
        this.setState({
          inicio,
          final,
          numero,
        });
        for (var x = inicio; x < final; x++) {
          algo.push(this.state.tags[x]);
        }
        this.setState({
          mostrar: algo,
        });
      }
    } else {
      swal("It can not!", {
        buttons: false,
        timer: 2000,
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
          <nav aria-label="Page navigation  ">
            <ul className="pagination justify-content-center">
              <li className="page-item ">
                <span className="page-link" onClick={this.paginationmenus}>
                  Previous
                </span>
              </li>

              <li className="page-item">
                <span className="page-link" onClick={this.paginationplus}>
                  Next
                </span>
              </li>
            </ul>
          </nav>
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
            <ul className="list-group mt-3">
              {this.state.mostrar.map((x) => (
                <li className="list-group-item" key={x.id}>
                  {x.name}
                </li>
              ))}
            </ul>
          )}
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
