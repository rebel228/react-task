import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import PokemonsSearch from "./components/PokemonSearch/pokemonsSearch";

export default function App() {
  return (
    <main>
      <ErrorBoundary>
        <PokemonsSearch />
      </ErrorBoundary>
    </main>
  );
}
