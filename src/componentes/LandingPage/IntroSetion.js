import React from "react";
import "../../style.css";
import Logo from "../../img/LogoSinFondo.png";
export default class IntroSetion extends React.Component {
  render() {
    return (
      <section id="intro" className="clearfix">
        <div className="container">
          <div className="intro-img">
            <img src={Logo} className="img-fluid" alt="" />
          </div>

          <div className="intro-info">
            <h2>
              Descubre la
              <br />
              nueva forma
              <br />
              de cocinar
            </h2>
            <div>
              <a href="#sabermas" className="btn-get-started scrollto">
                Saber Mas
              </a>
              <a href="#beneficios" className="btn-beneficios scrollto">
                Beneficios
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
