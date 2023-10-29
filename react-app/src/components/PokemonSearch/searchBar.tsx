import { Component } from "react";

export default class SearchBar extends Component {
  render() {
    return (
      <div className="search">
        <input type="text" className="search__input" id="search" />
      </div>
    );
  }
}
