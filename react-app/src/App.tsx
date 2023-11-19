import { Outlet, useSearchParams } from "react-router-dom";
import "./App.scss";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ContentProvider } from "./components/PokemonSearch/Context/Context";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/redux";
import { querySlice } from "./store/reducers/queryParamsSlice";
import { DEFAULT_LIMIT } from "./constants";
import SearchControls from "./components/PokemonSearch/SearchControls/SearchColtrols";
import SearchResults from "./components/PokemonSearch/SearchResults/SearchResults";

export default function App() {
  const [searchParams] = useSearchParams();
  const { setQueryParams } = querySlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setQueryParams({
        search: searchParams.get("search") || undefined,
        limit: searchParams.get("limit") || DEFAULT_LIMIT,
        page: searchParams.get("page") || "1",
      }),
    );
  }, [searchParams, dispatch, setQueryParams]);

  return (
    <main>
      <ErrorBoundary>
        <ContentProvider>
          <>
            <SearchControls />
            <div className="pokemon-section">
              <SearchResults />
              <Outlet />
            </div>
          </>
        </ContentProvider>
      </ErrorBoundary>
    </main>
  );
}
