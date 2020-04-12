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
            <h1 className="text-center">List</h1>
          </Link>

          <Link
            to="/Index/Products"
            className=" p-5 m-2 bg-orangeKitchen rounded col "
          >
            <h1 className="text-center">Add</h1>
          </Link>
        </div>
        <div className="row mt-3">
          <Link
            to="/Index/Category"
            className=" p-5 m-2 bg-orangeKitchen rounded col"
          >
            <h1 className="text-center">New category</h1>
          </Link>

          <Link
            to="/Index/Units"
            className=" p-5 m-2 bg-orangeKitchen rounded col "
          >
            <h1 className="text-center">New unit</h1>
          </Link>
          <Link
            to="/Index/Tags"
            className=" p-5 m-2 bg-orangeKitchen rounded col "
          >
            <h1 className="text-center">New tag</h1>
          </Link>
        </div>
      </div>
    );
  }
}
