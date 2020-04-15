import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class Category extends React.Component {
  state = {
    loading: false,
    error: null,
    categorys: [],
    mostrar: [],
    name: "",
    image: "",
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
        "http://3.219.6.57:5000/system/product-categories",
        requestOptions
      );
      const catego = await response.json();
      const categorys = catego.content.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      const numero = categorys.length - 10;
      this.setState({
        loading: false,
        categorys,
        numero,
      });
      let algo = [];
      for (var i = this.state.inicio; i < this.state.final; i++) {
        algo.push(this.state.categorys[i]);
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
        algo.push(this.state.categorys[i]);
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
        algo.push(this.state.categorys[x]);
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
          algo.push(this.state.categorys[i]);
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
          algo.push(this.state.categorys[x]);
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
  fileSelectedHandler = (e) => {
    this.setState({ image: e.target.files[0] });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.image === "") {
      swal("You need to fill all the fields!", {
        buttons: false,
        timer: 3000,
      });
    } else {
      this.setState({ loading: true });
      let fd = new FormData();
      fd.append("name", this.state.name);
      fd.append("image", this.state.image);
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
          "http://3.219.6.57:5000/admin/product-category",
          requestOptions
        );
        this.setState({ loading: false });
        const respuesta = await response.json();
        document.getElementById("name").value = "";
        document.getElementById("file").value = "";
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
              {this.state.mostrar.map((cat) => (
                <li className="list-group-item" key={cat.id}>
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card col">
          <h1 className="card-header">Categorys</h1>
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
