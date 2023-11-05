import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import PokemonsSearch from "./components/PokemonSearch/PokemonsSearch";

export default function App() {
  return (
    <main>
      <ErrorBoundary>
        <PokemonsSearch />
      </ErrorBoundary>
    </main>
  );
}
