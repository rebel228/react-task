import { Component } from "react";
import "./App.css";
import PokemonsSearch from "./components/PokemonSearch/pokemonsSearch";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ErrorButton from "./components/ErrorButton/ErrorButton";

export default class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <PokemonsSearch />
          <ErrorButton />
        </ErrorBoundary>
      </>
    );
  }
}
