import { Component } from "react";
import SearchResults from "./searchResults";
import SearchBar from "./searchBar";
import getPokemonDataByName from "../Api/getPokemonByName";
import { PokemonElementState } from "../../types";

export default class PokemonsSearch extends Component {
  state: PokemonElementState = {
    pokemons: [],
  };

  searchPokemonByName = (name: string) => {
    getPokemonDataByName(name).then((data) => {
      this.setState({
        pokemons: data.filter((pokemon) => pokemon !== undefined),
      });
    });
  };

  render() {
    return (
      <>
        <SearchBar search={this.searchPokemonByName} />
        <SearchResults pokemons={this.state.pokemons} />
      </>
    );
  }
}
