import { Component } from "react";
import "./loader.css";

export default class Loader extends Component {
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>;
      </div>
    );
  }
}
