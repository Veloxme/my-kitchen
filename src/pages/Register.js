import React from "react";
import { Link } from "react-router-dom";
import "../includes/bootstrap";
import swal from "sweetalert";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
    };
  }

  signUp = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.name === "" ||
      this.state.surname === ""
    ) {
      swal("Llene todos los campos!", {
        buttons: false,
        timer: 2000,
      });
    } else {
      fd.append("name", this.state.name);
      fd.append("surname", this.state.surname);
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
          Authorization: bearer,
        },
      };
      try {
        const response = await fetch(
          "http://3.219.6.57:5000/system/accounts",
          requestOptions
        );
        const respuesta = await response.json();
        if (respuesta.content.token) {
          localStorage.setItem("token", respuesta.content.token);
          swal("Hecho!", `${respuesta.details}`, "success");
          this.props.history.push("/Login");
        }
      } catch (err) {
        swal({
          icon: "error",
        });
        console.log(err);
      }
    }
  };

  changeHandler = (e) => {
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
