import { Component } from "react";
import { SearchBarState } from "../../types";

export default class SearchBar extends Component<SearchBarState> {
  render() {
    return (
      <div className="search">
        <input type="text" className="search__input" id="search" />
        <button
          className="search__button"
          onClick={() => this.props.search("")}
        >
          Search
        </button>
      </div>
    );
  }
}
