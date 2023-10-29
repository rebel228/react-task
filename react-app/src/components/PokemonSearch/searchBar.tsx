import { ChangeEvent, Component } from "react";
import { SearchBarProps, SearchBarData } from "../../types";

export default class SearchBar extends Component<SearchBarProps> {
  constructor(props: SearchBarProps) {
    super(props);
  }
  state: SearchBarData = {
    inputValue: "",
  };
  inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const lowerCase = event.target.value.toLocaleLowerCase();
    if (lowerCase) this.setState({ inputValue: lowerCase });
    else this.setState({ inputValue: "" });
  };
  render() {
    return (
      <div className="search">
        <input
          type="text"
          className="search__input"
          id="search"
          onChange={this.inputHandler}
        />
        <button
          className="search__button"
          onClick={() => this.props.search(this.state.inputValue)}
        >
          Search
        </button>
      </div>
    );
  }
}
