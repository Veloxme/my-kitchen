import React from "react";
import { Link } from "react-router-dom";
import "../includes/bootstrap";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: ""
    };
  }

  signUp = async e => {
    e.preventDefault();
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div id="log" className="container-fluid">
        <div className="row ">
          <h1 className="mx-auto mt-4 mb-1">Register</h1>
        </div>
        <form className="col-4 mx-auto" onSubmit={this.signUp}>
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
            <label>Surname</label>
            <input
              type="text"
              className="form-control"
              id="surname"
              name="surname"
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.changeHandler}
            />
          </div>
          <button className="btn btn-outline-light">Registrar</button>
          <Link to="/Login" className="btn btn-outline-danger ml-3 btn-sm">
            Cancelar
          </Link>
        </form>
      </div>
    );
  }
}
