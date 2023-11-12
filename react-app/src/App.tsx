import { Outlet } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ContentProvider } from "./components/PokemonSearch/Context/Context";

export default function App() {
  return (
    <main>
      <ErrorBoundary>
        <ContentProvider>
          <Outlet />
        </ContentProvider>
      </ErrorBoundary>
    </main>
  );
}
