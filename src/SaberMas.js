import React from "react";
import "./style.css";
import "./animate.css";
import "./font-awesome/css/font-awesome.min.css";
import portada from "./portada.jpg";
export default class SaberMas extends React.Component {
  render() {
    return (
      <section id="sabermas">
        <div class="container">
          <header class="section-header">
            <h3>Conocer mas</h3>
            <p>
              Solo necesitas decirnos que es lo que tienes en tu refrigerador o
              en tu alacena y nosotros te podemos dar opciones de que cocinar
              para ti y tus invitados.
            </p>
          </header>
          <div class="row sabermas-container">
            <div class="col-lg-6 content order-lg-1 order-2">
              <p>
                Usar MyKitchen es de lo mas facil, solo ingresa los productos
                que tienes en tu refrigerador o alacena y MyKitchen se encargara
                de darte todas les posibles recetas disponibles que puede haber
                con lo que tienes disponible y tambien recomendaciones si te
                faltan pocos productos.
              </p>

              <div class="icon-box wow fadeInUp">
                <div class="icon">
                  <i class="fa fa-shopping-bag"></i>
                </div>
                <h4 class="title">
                  <a href="">Tu Lista de super</a>
                </h4>
                <p class="description">
                  Puedes organizar las cosas que necesitas comprar desde
                  MyKitchen para que cuando vayas al super no se te olvide que
                  llevar o que nuevos productos comprar
                </p>
              </div>

              <div class="icon-box wow fadeInUp" data-wow-delay="0.2s">
                <div class="icon">
                  <i class="fa fa-cutlery "></i>
                </div>
                <h4 class="title">
                  <a href="">Recetas</a>
                </h4>
                <p class="description">
                  tantas recetas que puedes realizar que ni idea tienes,
                  MyKitchen te da las recetas para que las pongas en practica
                </p>
              </div>

              <div class="icon-box wow fadeInUp" data-wow-delay="0.4s">
                <div class="icon">
                  <i class="fa fa-heart "></i>
                </div>
                <h4 class="title">
                  <a href="">Saludable</a>
                </h4>
                <p class="description">
                  Puedes configurar MyKitchen a tu manera, si una fruta no te
                  gusta o te quieres cuidar nos encargamos de que tu estes bien
                </p>
              </div>
            </div>

            <div class="col-lg-6 background order-lg-2 order-1 wow fadeInUp">
              <img src={portada} class="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
