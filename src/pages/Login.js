import React from "react";
import { Link } from "react-router-dom";
import "../includes/bootstrap";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  signIn = async e => {
    e.preventDefault();
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div id="log" className="container-fluid">
        <div className="row ">
          <h1 className="mx-auto mt-4 mb-1">Login</h1>
        </div>
        <form className="col-4 mx-auto" onSubmit={this.signIn}>
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
          <button className="btn btn-outline-light">Iniciar sesion</button>
          <Link
            to="/Register"
            className="btn btn-outline-secondary ml-3 btn-sm"
          >
            Registrate
          </Link>
        </form>
      </div>
    );
  }
}
