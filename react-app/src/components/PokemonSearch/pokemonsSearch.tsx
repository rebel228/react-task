import { Component } from "react";
import SearchResults from "./searchResults";
import SearchBar from "./searchBar";
import getPokemonByName from "../Api/getPokemonByName";

export default class PokemonsSearch extends Component {
  state = {
    name: null,
    id: null,
    url: null,
  };

  componentDidMount() {
    console.log("mount");
    getPokemonByName("").then((data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <>
        <SearchBar />
        <SearchResults />
      </>
    );
  }
}
