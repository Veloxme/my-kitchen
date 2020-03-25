import React from "react";
import { Link } from "react-router-dom";
import "../includes/bootstrap";
import "../style.css";
import Logo from "../img/LogoSinFondo1.png";

export default class Navbar extends React.Component {
  closeseccion = () => {
    localStorage.removeItem("token");
  };
  render() {
    return (
      <header id="header">
        <div className="container">
          <div className="logo float-left">
            <Link to="/" className="scrollto">
              <img src={Logo} className="img-fluid" alt="" />
            </Link>
          </div>
          <nav className="main-nav  float-right d-none d-block">
            <ul>
              {localStorage.getItem("token") === null ? (
                <li className="active">
                  <Link to="/Login">Ingresar</Link>
                </li>
              ) : (
                <li className="active">
                  <Link to="/Login" onClick={this.closeseccion}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
