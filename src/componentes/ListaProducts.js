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
        `http://3.219.6.57:5000/system/products`,
        requestOptions
      );
      const reci = await response.json();
      const Recipes = reci.content;
      const numero = Recipes.length - 10;
      this.setState({
        loading: false,
        Recipes: Recipes,
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
  render() {
    return (
      <div className="container mt-3 mb-3">
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
              {rec.name}
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
