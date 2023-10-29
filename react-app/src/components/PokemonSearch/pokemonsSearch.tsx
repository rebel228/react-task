import { Component } from "react";
import SearchResults from "./searchResults";
import SearchBar from "./searchBar";
import getPokemonDataByName from "../Api/getPokemonByName";
import { PokemonElementState } from "../../types";

export default class PokemonsSearch extends Component {
  state: PokemonElementState = {
    pokemons: [],
  };

  /*   componentDidMount() {
    console.log("mount");
    getPokemonDataByName("").then((data) => {
      this.setState(data);
      console.log(data);
    });
  } */

  searchPokemonByName = (name: string) => {
    console.log("clicked");
    getPokemonDataByName(name).then((data) => {
      this.setState({ pokemons: data });
      console.log(data);
    });
  };

  render() {
    console.log("render element");
    console.log(this.state.pokemons);
    return (
      <>
        <SearchBar search={this.searchPokemonByName} />
        <SearchResults pokemons={this.state.pokemons} />
      </>
    );
  }
}
