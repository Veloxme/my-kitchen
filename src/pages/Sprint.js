import React from "react";
import "../sprint.css";
import Logo from "../img/sprint_logo.png";
import main from "../img/main.jpg";
import esquema from "../img/esquema.png";

export default class Sprint extends React.Component {
  render() {
    return (
      <div>
        <div id="mu-hero" class="mu-hero-featured-area ">
          <div class="mu-logo-area ">
            <img src={Logo} className="mu-logo " alt="" />
          </div>
        </div>
        <section id="mu-about">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="mu-about-area">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mu-about-left">
                        <img src={main} className="" alt="" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mu-about-right">
                        <h2>Acerca de nosotros</h2>
                        <p>
                          Sprint Development es una desarrolladora de software
                          startup oriunda de Mazatlán, enfocada en soluciones
                          informáticas con tecnologías web y móvil.
                        </p>
                        <p>
                          Conformada por un equipo de trabajo especializado,
                          contando con personal capacitado en uso de
                          herramientas y lenguajes de programación de
                          vanguardia, con dos de los alumnos más destacados de
                          la actual y última generación de Ingeniería en
                          Informática en UPSIN y con programadores con
                          experiencia laboral de calidad.
                        </p>

                        <p>
                          Actualmente se está desarrollando un proyecto bajo el
                          nombre “MyKitchen”, una aplicación móvil para
                          facilitar el inventario de alimentos en los hogares,
                          así como proporcionar un amplio recetario en base a la
                          información dada.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="">
          <h2 className="mu-title-area">Estructura Organizacional</h2>
          <img src={esquema} className="col" alt="" />
        </div>
      </div>
    );
  }
}
