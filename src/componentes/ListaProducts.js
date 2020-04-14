import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class ListaProducts extends React.Component {
  state = {
    loading: false,
    error: null,
    Recipes: [],
    mostrar: [],
    inicio: 0,
    final: 10,
    numero: 0,
    tope: 0,
    search: "",
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
        `http://3.219.6.57:5000/system/products/details`,
        requestOptions
      );
      const reci = await response.json();
      const Recipes = reci.content.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      const numero = Recipes.length - 10;
      this.setState({
        loading: false,
        Recipes,
        numero,
      });
      let algo = [];
      for (var i = this.state.inicio; i < this.state.final; i++) {
        algo.push(this.state.Recipes[i]);
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
  search = () => {
    let algo = [];
    if (this.state.search === "") {
      this.fetchCaregories();
    } else {
      for (var x = 0; x < this.state.Recipes.length; x++) {
        if (
          this.state.search.toLowerCase() ===
          this.state.Recipes[x].name.toLowerCase()
        ) {
          algo.push(this.state.Recipes[x]);
          this.setState({
            mostrar: algo,
          });
        }
      }
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
        algo.push(this.state.Recipes[i]);
      }
      this.setState({
        mostrar: algo,
      });
    } else if (this.state.tope === 1 || this.state.numero === 0) {
      swal("No se puede", {
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
        algo.push(this.state.Recipes[x]);
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
          algo.push(this.state.Recipes[i]);
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
          algo.push(this.state.Recipes[x]);
        }
        this.setState({
          mostrar: algo,
        });
      }
    } else {
      swal("No se puede", {
        buttons: false,
        timer: 2000,
      });
    }
  };
  put = async (e) => {
    this.props.history.push(`/Index/EditProduct/${e}`);
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
      await fetch(`http://3.219.6.57:5000/admin/product/${e}`, requestOptions);

      this.setState({ loading: false });
      swal("Hecho!", "El producto se a eliminado con exito!", "success");
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
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="container mt-3 mb-3">
        <div className="row p-3">
          <input
            className="form-control col-9 mr-3 ml-3"
            name="search"
            placeholder="Search"
            onChange={this.changeHandler}
          />
          <button
            className="btn btn-outline-success col-2"
            onClick={this.search}
          >
            Search
          </button>
        </div>

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
        <ul className="list-group mt-3">
          {this.state.mostrar.map((rec) => (
            <li className="list-group-item" key={rec.id}>
              {`${rec.name}: ${rec.subproducts[0].presentation}`}
              <button
                onClick={() => this.delete(rec.id)}
                className="badge badge-danger badge-pill float-right"
              >
                Delete
              </button>
              <button
                onClick={() => this.put(rec.id)}
                className="badge badge-warning badge-pill float-right mr-3"
              >
                Modify
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
