import React from "react";
import { Link } from "react-router-dom";
import "../includes/bootstrap";
import "../style.css";
import "../animate.css";
import Logo from "../img/LogoSinFondo1.png";

export default class Navbar extends React.Component {
  render() {
    return (
      <header id="header">
        <div className="container">
          <div className="logo float-left">
            <Link to="/" className="scrollto">
              <img src={Logo} className="img-fluid" alt="" />
            </Link>
          </div>
          <nav className="main-nav float-right d-none d-lg-block">
            <ul>
              <li className="active">
                <Link to="/Login">Ingresar</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
