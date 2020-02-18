import React from "react";
import "../../style.css";
import "../../font-awesome/css/font-awesome.min.css";
import "../../ionicons/css/ionicons.min.css";
export default class Beneficios extends React.Component {
  render() {
    return (
      <section id="beneficios" className="section-bg">
        <div className="container">
          <header className="section-header">
            <h3>Beneficios</h3>
            <p>
              Estas son algunos de los beneficios que tienes al utilizar
              MyKitchen.
            </p>
          </header>

          <div className="row">
            <div
              className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp"
              data-wow-duration="1.4s"
            >
              <div className="box">
                <div className="icon">
                  <i className="ion-ios-nutrition-outline"></i>
                </div>
                <h4 className="title">
                  <a href="/">Control</a>
                </h4>
                <p className="description">
                  MyKitchen te avisa cuando esta por caducar algun producto en
                  tu refrigerador o alacena
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-5 wow bounceInUp"
              data-wow-duration="1.4s"
            >
              <div className="box">
                <div className="icon">
                  <i className="ion-ios-bookmarks-outline"></i>
                </div>
                <h4 className="title">
                  <a href="/">Catalogo</a>
                </h4>
                <p className="description">
                  Tienes en tus manos unos de los mas grandes catalogos de
                  recetas en el mundo
                </p>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp"
              data-wow-delay="0.1s"
              data-wow-duration="1.4s"
            >
              <div className="box">
                <div className="icon">
                  <i className="ion-ios-paper-outline"></i>
                </div>
                <h4 className="title">
                  <a href="/">Recetas</a>
                </h4>
                <p className="description">
                  Recetas claras y faciles de seguir, asi no tendras poblema en
                  equivocarte en la preparacion
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-5 wow bounceInUp"
              data-wow-delay="0.1s"
              data-wow-duration="1.4s"
            >
              <div className="box">
                <div className="icon">
                  <i className="ion-ios-speedometer-outline"></i>
                </div>
                <h4 className="title">
                  <a href="/">Tiempo</a>
                </h4>
                <p className="description">
                  Ahorra y aprovecha tu tiempo utilizando MyKitchen ya que no
                  hace falta que tardes horas buscando que hacer
                </p>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp"
              data-wow-delay="0.2s"
              data-wow-duration="1.4s"
            >
              <div className="box">
                <div className="icon">
                  <i className="ion-ios-flame-outline"></i>
                </div>
                <h4 className="title">
                  <a href="/">Favoritos</a>
                </h4>
                <p className="description">
                  Gusarda tus recetas favoritas para que las puedas repetir las
                  veces que quieras y gusrda tus propias recetas para
                  compartirlas
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-5 wow bounceInUp"
              data-wow-delay="0.2s"
              data-wow-duration="1.4s"
            >
              <div className="box">
                <div className="icon">
                  <i className="ion-ios-clock-outline"></i>
                </div>
                <h4 className="title">
                  <a href="/">Adaptacion</a>
                </h4>
                <p className="description">
                  puedes tener las recetas ya previstas para toda la semana y no
                  tengas que experimentar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
