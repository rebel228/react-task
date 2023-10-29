import { Component } from "react";
import { PokemonResults } from "../../types";

export default class PokemonCard extends Component<PokemonResults> {
  upperFirstLetter = (string: string): string => {
    return string.charAt(0).toLocaleUpperCase() + string.slice(1);
  };

  render() {
    return (
      <div className="pokemon">
        <h3 className="pokemon__title">
          {this.upperFirstLetter(this.props.name)}
        </h3>
        <img
          src={
            this.props.imgUrl
              ? this.props.imgUrl
              : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"
          }
          alt={"Image of" + this.props.name}
          className="pokemon__img"
        />
        <p className="pokemon__text">{this.props.descr}</p>
      </div>
    );
  }
}
