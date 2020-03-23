import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import swal from "sweetalert";

export default class Products extends React.Component {
  state = {
    loading: false,
    error: null,
    categorys: [],
    units: [],
    name: "",
    category: "",
    presentation: "",
    equivalence: "",
    expiration: "",
    unit: "",
    steps: "",
    negligible: "",
    image: ""
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
        Authorization: bearer
      }
    };
    try {
      const response = await fetch(
        "http://3.219.6.57:5000/system/product-categories",
        requestOptions
      );
      const catego = await response.json();
      const categorys = catego.content;
      this.setState({
        loading: false,
        categorys
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
      swal({
        icon: "error"
      });
    }
    try {
      const response = await fetch(
        "http://3.219.6.57:5000/system/units",
        requestOptions
      );
      const unit = await response.json();
      const units = unit.content;
      this.setState({
        loading: false,
        units
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
      swal({
        icon: "error"
      });
    }
    let combo = document.getElementById("category").value;
    this.setState({ category: combo });
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  fileSelectedHandler = e => {
    this.setState({ image: e.target.files[0] });
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    let fd = new FormData();
    fd.append("name", this.state.name);
    fd.append("productCategory_id", this.state.category);
    fd.append("image", this.state.image);
    const bearer = "Bearer " + localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      body: fd,
      withCredentials: true,
      headers: {
        Authorization: bearer
      }
    };
    try {
      const response = await fetch(
        "http://3.219.6.57:5000/admin/product",
        requestOptions
      );
      const json = await response.json();
      let id = json.content.id;
      let formdata = new FormData();
      formdata.append("presentation", this.state.presentation);
      formdata.append("equivalence", this.state.equivalence);
      formdata.append("unit_id", this.state.unit);
      formdata.append("step", this.state.steps);
      formdata.append("step_unit_id", this.state.unit);
      formdata.append("negligible", this.state.negligible);
      formdata.append("expiration", this.state.expiration);
      const Options = {
        method: "POST",
        body: formdata,
        withCredentials: true,
        headers: {
          Authorization: bearer
        }
      };
      const respuesta = await fetch(
        `http://3.219.6.57:5000/admin/product/${id}/subproduct`,
        Options
      );
      const back = await respuesta.json();
      console.log(back);
      this.setState({ loading: false });
      swal("Hecho!", "El producto se a guardado con exito!", "success");
    } catch (err) {
      this.setState({
        loading: false
      });
      swal({
        icon: "error"
      });
      console.log(err);
    }
  };
  render() {
    const { loading } = this.state;
    if (this.state.error) {
      return <p className="text-center">error...</p>;
    }
    return (
      <div className="card mx-auto mt-4 mb-1 col-md-6">
        <h1 className=" card-header ">Products</h1>
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
            <label>Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              onChange={this.changeHandler}
            >
              {this.state.categorys.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Presentation</label>
            <input
              type="text"
              className="form-control"
              id="presentation"
              name="presentation"
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <label>Equivalence</label>
            <input
              type="number"
              className="form-control"
              id="equivalence"
              name="equivalence"
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <label>Expiration</label>
            <input
              type="number"
              className="form-control"
              id="expiration"
              name="expiration"
              onChange={this.changeHandler}
            />
          </div>
          <div className="row">
            <label className="col-12">Unit</label>
            {this.state.units.map(unit => (
              <div
                key={unit.id}
                className="form-check form-check-inline col pl-3"
              >
                <input
                  type="radio"
                  className="form-check-input"
                  id="unit"
                  name="unit"
                  value={unit.id}
                  onChange={this.changeHandler}
                />
                <label>{unit.name}</label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Steps</label>
            <input
              type="number"
              className="form-control"
              id="steps"
              name="steps"
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <label>Negligible</label>
            <input
              type="number"
              className="form-control"
              id="negligible"
              name="negligible"
              onChange={this.changeHandler}
            />
          </div>
          <button className="btn btn-outline-success" disabled={loading}>
            {loading && <i className="fa fa-refresh fa-spin"></i>}Guardar
          </button>
        </form>
      </div>
    );
  }
}
