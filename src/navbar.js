import React from "react";
import { Link } from "react-router-dom";
import "./includes/bootstrap";
import "./style.css";
import "./animate.css";
import Logo from "./LogoSinFondo1.png";

class Navbar extends React.Component {
  render() {
    return (
      <header id="header" class="fixed-top">
        <div class="container">
          <div class="logo float-left">
            <Link to="/" class="scrollto">
              <img src={Logo} class="img-fluid" />
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;
