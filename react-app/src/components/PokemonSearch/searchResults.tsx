import { Component } from "react";
import { PokemonElementProps } from "../../types";
import PokemonCard from "./pokemonCard";

export default class SearchResults extends Component<PokemonElementProps> {
  constructor(props: PokemonElementProps) {
    super(props);
  }
  render() {
    return (
      <div className="search-results">
        {this.props.pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            imgUrl={pokemon.imgUrl}
            descr={pokemon.descr}
          />
        ))}
      </div>
    );
  }
}
