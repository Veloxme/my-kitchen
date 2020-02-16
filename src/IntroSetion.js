import React from "react";
import "./style.css";
import Logo from "./LogoSinFondo.png";
export default class IntroSetion extends React.Component {
  render() {
    return (
      <section id="intro" class="clearfix">
        <div class="container">
          <div class="intro-img">
            <img src={Logo} class="img-fluid" />
          </div>

          <div class="intro-info">
            <h2>
              Descubre la
              <br />
              nueva forma
              <br />
              de cocinar
            </h2>
            <div>
              <a href="#sabermas" class="btn-get-started scrollto">
                Saber Mas
              </a>
              <a href="#beneficios" class="btn-beneficios scrollto">
                Beneficios
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
