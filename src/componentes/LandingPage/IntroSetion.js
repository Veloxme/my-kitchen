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
              Descargalo
              <br />
              pronto
            </h2>
          </div>
        </div>
      </section>
    );
  }
}
