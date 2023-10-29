import { Component } from "react";
import { PokemonResults } from "../../types";

export default class PokemonCard extends Component<PokemonResults> {
  render() {
    return (
      <div className="pokemon" key={this.props.id}>
        <h6 className="pokemon__title">{this.props.name}</h6>
        <img
          src={
            this.props.imgUrl
              ? this.props.imgUrl
              : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"
          }
          alt={"Image of" + this.props.name}
          className="pokemon__img"
        />
        <p className="pokemon__text"></p>
      </div>
    );
  }
}
