import React from "react";
import { Link } from "react-router-dom";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";

export default class Products extends React.Component {
  render() {
    return (
      <div className="card mx-auto mt-4 mb-1 col-6">
        <h1 className=" card-header ">Products</h1>
        <form className=" card-body " onSubmit={this.signUp}>
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
            <div className="form-check form-check-inline col pl-3">
              <input
                type="radio"
                className="form-check-input"
                id="unit"
                name="unit"
                value="gramos"
                onChange={this.changeHandler}
              />
              <label>Gramos</label>
            </div>
            <div className="form-check form-check-inline col">
              <input
                type="radio"
                className="form-check-input"
                id="unit"
                name="unit"
                value="kilogramos"
                onChange={this.changeHandler}
              />
              <label>Kilogramos</label>
            </div>
            <div className="form-check form-check-inline col">
              <input
                type="radio"
                className="form-check-input"
                id="unit"
                name="unit"
                value="mililitros"
                onChange={this.changeHandler}
              />
              <label>Mililitros</label>
            </div>
            <div className="form-check form-check-inline col">
              <input
                type="radio"
                className="form-check-input"
                id="unit"
                name="unit"
                value="litros"
                onChange={this.changeHandler}
              />
              <label>Litros</label>
            </div>
          </div>
          <div className="form-group">
            <label>Calories</label>
            <input
              type="number"
              className="form-control"
              id="calories"
              name="calories"
              onChange={this.changeHandler}
            />
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
          <button className="btn btn-outline-success">Guardar</button>
        </form>
      </div>
    );
  }
}
