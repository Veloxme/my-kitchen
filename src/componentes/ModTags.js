import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class Recipes extends React.Component {
  state = {
    loading: false,
    error: null,
    tags: [],
    tag: [],
    producto: [],
    eliminar: [],
    agregar: [],
    inicial: [],
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
        "http://3.219.6.57:5000/system/tags",
        requestOptions
      );
      const tag = await response.json();
      const tags = tag.content;
      this.setState({
        loading: false,
        tags,
      });

      for (var i = 0; i < tags.length; i++) {
        for (var x = 0; x < this.state.producto.tags.length; x++) {
          if (tags[i].id === this.state.producto.tags[x].tag.id) {
            document.getElementById(tags[i].id).checked = true;
          }
        }
      }
      for (var y = 0; y < this.state.producto.tags.length; y++) {
        this.state.inicial.push(this.state.producto.tags[y].tag.id);
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
      swal({
        icon: "error",
      });
      console.log(error);
    }
  };
  pushHandler = (e) => {
    if (this.state.eliminar.indexOf(parseInt(e.target.value, 10)) > -1) {
      this.state.eliminar.splice(
        this.state.eliminar.indexOf(parseInt(e.target.value, 10)),
        1
      );
    } else if (this.state.inicial.indexOf(parseInt(e.target.value, 10)) > -1) {
      this.state.eliminar.push(parseInt(e.target.value, 10));
    }
    if (this.state.tag.indexOf(parseInt(e.target.value, 10)) > -1) {
      this.state.tag.splice(
        this.state.tag.indexOf(parseInt(e.target.value, 10)),
        1
      );
    } else if (
      this.state.inicial.indexOf(parseInt(e.target.value, 10)) === -1
    ) {
      this.state.tag.push(parseInt(e.target.value, 10));
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    const bearer = "Bearer " + localStorage.getItem("token");
    try {
      if (this.state.eliminar.length !== 0 || this.state.tag.length !== 0) {
        if (this.state.eliminar.length !== 0) {
          for (var y = 0; y < this.state.producto.tags.length; y++) {
            for (var x = 0; x < this.state.eliminar.length; x++) {
              if (
                this.state.producto.tags[y].tag.id === this.state.eliminar[x]
              ) {
                this.setState({ loading: true });
                const requestOptions = {
                  method: "DELETE",
                  withCredentials: true,
                  headers: {
                    Authorization: bearer,
                  },
                };
                await fetch(
                  `http://3.219.6.57:5000/admin/recipe/${this.state.id}/tag/${this.state.producto.tags[y].id}`,
                  requestOptions
                );
                this.setState({ loading: false });
              }
            }
          }
        }
        if (this.state.tag.length !== 0) {
          this.setState({ loading: true });
          let formdata = new FormData();
          const requestOptions = {
            method: "POST",
            body: formdata,
            withCredentials: true,
            headers: {
              Authorization: bearer,
            },
          };
          this.state.tag.map(async (tags) => {
            formdata.append("tag_id", tags);
            await fetch(
              `http://3.219.6.57:5000/admin/recipe/${this.state.id}/tag`,
              requestOptions
            );
          });
          this.setState({ loading: false });
        }
      }
      swal("Hecho!", "La receta se modifico con exito!", "success");
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
      <div className="card mx-auto mt-4 mb-1 col-md-6">
        <h1 className=" card-header ">Recipe "{this.state.producto.name}"</h1>
        <form className=" card-body " onSubmit={this.handleSubmit}>
          <div className="row">
            <label className="col-12">Tags</label>
            {this.state.tags.map((tag) => (
              <div key={tag.id} className="form-check form-check-inline col">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={tag.id}
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
            {loading && <i className="fa fa-refresh fa-spin"></i>}Save
          </button>
        </form>
      </div>
    );
  }
}
