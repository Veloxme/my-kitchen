import React from "react";
import { Link } from "react-router-dom";

import "../includes/bootstrap";
import "../font-awesome/css/font-awesome.min.css";

export default class NavColumn extends React.Component {
  render() {
    return (
      <ul id="column" className="nav flex-column list-unstyled">
        <li className="nav-item mx-auto ">
          <Link className="nav-link active" to="/Index/Poducts">
            <i className="fa fa-shopping-basket fa-2x "></i>
          </Link>
        </li>
        <li className="nav-item mx-auto">
          <Link className="nav-link" to="/Index/Recipes">
            <i className="fa fa-list-ul fa-2x "></i>
          </Link>
        </li>
      </ul>
    );
  }
}
