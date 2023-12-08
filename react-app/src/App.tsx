import { Outlet, useNavigation } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ContentProvider } from "./components/PokemonSearch/Context/Context";
import Loader from "./components/Loader/Loader";

export default function App() {
  const navigation = useNavigation();
  return (
    <main>
      <ErrorBoundary>
        <ContentProvider>
          {navigation.state === "loading" && <Loader />}
          <Outlet />
        </ContentProvider>
      </ErrorBoundary>
    </main>
  );
}
