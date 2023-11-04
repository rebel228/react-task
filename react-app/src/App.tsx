import "./App.css";
import PokemonsSearch from "./components/PokemonSearch/pokemonsSearch";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

export default function App() {
  return (
    <main>
      <ErrorBoundary>
        <PokemonsSearch />
      </ErrorBoundary>
    </main>
  );
}
