import React from "react";
import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

export default class MenuProducts extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-3">Products</h1>
        <div className="row mt-3">
          <Link
            to="/Index/ListaProducts"
            className=" p-5 m-2 bg-orangeKitchen rounded col"
          >
            <h1 className="text-center">Lista</h1>
          </Link>

          <Link
            to="/Index/Products"
            className=" p-5 m-2 bg-orangeKitchen rounded col "
          >
            <h1 className="text-center">Agregar</h1>
          </Link>
        </div>
      </div>
    );
  }
}
