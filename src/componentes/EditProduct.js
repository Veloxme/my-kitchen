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
    image: "",
    identifi: "",
    producto: "",
    detalles: "",
    stepsunit: "",
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
        `http://3.219.6.57:5000/system/products/${id}`,
        requestOptions
      );
      const producto = await response.json();
      this.setState({
        loading: false,
        producto: producto.content,
        detalles: producto.content.subproducts[0],
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
        "http://3.219.6.57:5000/system/product-categories",
        requestOptions
      );
      const catego = await response.json();
      const categorys = catego.content;
      this.setState({
        loading: false,
        categorys,
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
        "http://3.219.6.57:5000/system/units",
        requestOptions
      );
      const unit = await response.json();
      const units = unit.content;

      this.setState({
        loading: false,
        units,
      });
      for (var i = 0; i < units.length; i++) {
        if (units[i].id === this.state.detalles.stepUnitId) {
          document.getElementById(`step${units[i].id}`).checked = true;
        }
      }
      for (var x = 0; x < units.length; x++) {
        if (units[x].id === this.state.detalles.unitId) {
          document.getElementById(units[x].name).checked = true;
        }
      }
      document.getElementById(this.state.producto.productcategoryId).selected =
        "selected";
      this.setState({
        name: this.state.producto.name,
        category: this.state.producto.productcategoryId,
        presentation: this.state.detalles.presentation,
        equivalence: this.state.detalles.equivalence,
        expiration: this.state.detalles.expiration,
        steps: this.state.detalles.step,
        negligible: this.state.detalles.negligible,
        unit: this.state.detalles.unitId,
        stepsunit: this.state.detalles.stepUnitId,
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
    console.log(e.target.value);
  };
  fileSelectedHandler = (e) => {
    this.setState({ image: e.target.files[0] });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let fd = new FormData();
    fd.append("name", this.state.name);
    fd.append("productCategory_id", this.state.category);
    var archivoBlob = new Blob([this.state.image], { type: "file" });
    fd.append("image", archivoBlob);
    const bearer = "Bearer " + localStorage.getItem("token");
    const requestOptions = {
      method: "PUT",
      body: fd,
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    };
    try {
      await fetch(
        `http://3.219.6.57:5000/admin/product/${this.state.identifi}`,
        requestOptions
      );
      let formdata = new FormData();
      formdata.append("presentation", this.state.presentation);
      formdata.append("equivalence", this.state.equivalence);
      formdata.append("unit_id", this.state.unit);
      formdata.append("step", this.state.steps);
      formdata.append("step_unit_id", this.state.stepsunit);
      formdata.append("negligible", this.state.negligible);
      formdata.append("expiration", this.state.expiration);
      const Options = {
        method: "PUT",
        body: formdata,
        withCredentials: true,
        headers: {
          Authorization: bearer,
        },
      };
      const respuesta = await fetch(
        `http://3.219.6.57:5000/admin/product/${this.state.identifi}/subproduct/${this.state.detalles.id}`,
        Options
      );
      const back = await respuesta.json();
      this.setState({ loading: false });
      swal("Done!", `${back.details}`, "success");
      this.props.history.push(`/Index/ListaProducts`);
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
    const { loading } = this.state;
    if (this.state.error) {
      return <p className="text-center">error...</p>;
    }
    return (
      <div>
        {this.state.loading && (
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
        )}
        <div className="card mx-auto mt-4 mb-1 col-md-7">
          <h1 className=" card-header ">Products</h1>
          <form className=" card-body " onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="form-group col">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={this.changeHandler}
                  value={this.state.name}
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
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                id="category"
                name="category"
                onChange={this.changeHandler}
              >
                {this.state.categorys.map((cat) => (
                  <option key={cat.id} id={cat.id} value={cat.id}>
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
                value={this.state.presentation}
              />
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Equivalence</label>
                <input
                  type="number"
                  className="form-control"
                  id="equivalence"
                  name="equivalence"
                  onChange={this.changeHandler}
                  value={this.state.equivalence}
                />
              </div>
              <div className="form-group col">
                <label>Expiration</label>
                <input
                  type="number"
                  className="form-control"
                  id="expiration"
                  name="expiration"
                  onChange={this.changeHandler}
                  value={this.state.expiration}
                />
              </div>
            </div>
            <div className="row">
              <label className="col-12">Unit</label>
              {this.state.units.map((unit) => (
                <div
                  key={unit.id}
                  className="form-check form-check-inline col pl-3"
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    id={unit.name}
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
                value={this.state.steps}
              />
            </div>
            <div className="row">
              <label className="col-12">step unit</label>
              {this.state.units.map((unit) => (
                <div
                  key={unit.id}
                  className="form-check form-check-inline col pl-3"
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    id={`step${unit.id}`}
                    name="stepsunit"
                    value={unit.id}
                    onChange={this.changeHandler}
                  />
                  <label>{unit.name}</label>
                </div>
              ))}
            </div>
            <div className="form-group ">
              <label>Negligible</label>
              <input
                type="number"
                className="form-control"
                id="negligible"
                name="negligible"
                onChange={this.changeHandler}
                value={this.state.negligible}
              />
            </div>

            <button
              className="btn btn-outline-success float-right"
              disabled={loading}
            >
              {loading && <i className="fa fa-refresh fa-spin"></i>}Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
