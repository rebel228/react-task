import { Component } from "react";
import { PokemonResults } from "../../types";

export default class PokemonCard extends Component<PokemonResults> {
  render() {
    return (
      <div className="pokemon" key={this.props.id}>
        <h6 className="pokemon__title">{this.props.name}</h6>
        <img
          src={this.props.url}
          alt={"Image of" + this.props.name}
          className="pokemon__img"
        />
        <p className="pokemon__text"></p>
      </div>
    );
  }
}
