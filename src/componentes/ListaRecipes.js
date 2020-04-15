import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class ListaRecipes extends React.Component {
  state = {
    loading: false,
    error: null,
    Recipes: [],
    offset: 0,
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
        `http://3.219.6.57:5000/system/recipes?limit=10&offset=${this.state.offset}`,
        requestOptions
      );
      const reci = await response.json();
      if (reci.content.length === 0) {
        swal("It can not!", {
          buttons: false,
          timer: 2000,
        });
        this.Previous();
      }
      const recipes = reci.content.sort((a, b) => {
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
        Recipes: recipes,
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
  put = async (e) => {
    this.props.history.push(`/Index/MenuMod/${e}`);
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
      const response = await fetch(
        `http://3.219.6.57:5000/admin/recipe/${e}`,
        requestOptions
      );
      const respuesta = await response.json();
      this.setState({ loading: false });
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
  };
  Previous = () => {
    if (this.state.offset === 0) {
      swal("It can not!", {
        buttons: false,
        timer: 2000,
      });
    } else {
      this.setState(
        {
          offset: this.state.offset - 10,
        },
        () => {
          this.fetchCaregories();
        }
      );
    }
  };
  Next = () => {
    this.setState(
      {
        offset: this.state.offset + 10,
      },
      () => {
        this.fetchCaregories();
      }
    );
  };
  render() {
    return (
      <div className="container mt-3">
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item ">
              <span className="page-link" onClick={this.Previous}>
                Previous
              </span>
            </li>

            <li className="page-item">
              <span className="page-link" onClick={this.Next}>
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
            {this.state.Recipes.map((rec) => (
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
        )}
      </div>
    );
  }
}
