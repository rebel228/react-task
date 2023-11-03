import { Component } from "react";
import "./App.css";
import PokemonsSearch from "./components/PokemonSearch/pokemonsSearch";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

export default class App extends Component {
  render() {
    return (
      <main>
        <ErrorBoundary>
          <PokemonsSearch />
        </ErrorBoundary>
      </main>
    );
  }
}
