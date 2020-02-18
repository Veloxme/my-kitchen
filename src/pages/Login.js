import React from "react";
import { Link } from "react-router-dom";
import "../includes/bootstrap";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
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
      <div id="log" className="container">
        <div className="row ">
          <h1 className="mx-auto mt-4 mb-1">Login</h1>
          <div className="col-12">
            <div className="col-md-4 offset-4">
              <form onSubmit={this.signIn}>
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={this.changeHandler}
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    onChange={this.changeHandler}
                  />
                </div>
                <button class="btn btn-outline-light">Iniciar sesion</button>
                <Link
                  to="/Register"
                  class="btn btn-outline-secondary ml-3 btn-sm"
                >
                  Registrate
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
