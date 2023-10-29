import { Component } from "react";
import "./App.css";
import PokemonsSearch from "./components/PokemonSearch/pokemonsSearch";

export default class App extends Component {
  render() {
    return (
      <>
        <PokemonsSearch />
      </>
    );
  }
}
