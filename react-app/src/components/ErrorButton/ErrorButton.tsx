import { Component } from "react";

export default class ErrorButton extends Component {
  state = { error: false };
  throw = () => {
    this.setState({ error: true });
  };
  render() {
    if (this.state.error) throw new Error("Some crazy Error");
    return (
      <button className="error__button" onClick={() => this.throw()}>
        Error
      </button>
    );
  }
}
