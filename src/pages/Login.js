import React from "react";
import { Link } from "react-router-dom";
import "../includes/bootstrap";
import swal from "sweetalert";

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
    let fd = new FormData();
    fd.append("email", this.state.email);
    fd.append("password", this.state.password);
    const bearer =
      "Bearer " +
      "S<yus%;|ZO'1k/ISa^H+6_,!:&$0Z+kM9)B?;f`=]=p%q!)uJ^x_!F!7!LL&F|B";
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
        "http://3.219.6.57:5000/login",
        requestOptions
      );
      const respuesta = await response.json();
      if (respuesta.content.token) {
        localStorage.setItem("token", respuesta.content.token);
        swal({
          icon: "success"
        });
        this.props.history.push("/Index");
      }
    } catch (err) {
      swal({
        icon: "error"
      });
      console.log(err);
    }
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
