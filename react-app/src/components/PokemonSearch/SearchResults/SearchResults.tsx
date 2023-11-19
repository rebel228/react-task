import { useNavigate, useMatch, useSearchParams } from "react-router-dom";
import "./searchResults.scss";
import { DEFAULT_PATH } from "../../../constants";
import { pokemonAPI } from "../../../services/PokemonService";
import PokemonCard2 from "../PokemonCard/PokemonCard";
import { useAppSelector } from "../../../hooks/redux";
import Loader from "../../Loader/Loader";

export default function SearchResults() {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { search, limit, page } = useAppSelector(
    (state) => state.queryParamsReducer,
  );
  const offset = ((Number(page) - 1) * Number(limit)).toString();
  const {
    data: pokemons,
    isError,
    isLoading,
  } = search
    ? pokemonAPI.useGetPokemonByNameQuery(search)
    : pokemonAPI.useListPokemonsQuery({
        limit,
        offset,
      });
  const isShowingDetails = useMatch("details/:id");

  const handlePrev = () => {
    const newPage = (Number(page) - 1).toString();
    setSearchParams({ page: newPage, limit });
  };

  const handleNext = () => {
    const newPage = (Number(page) + 1).toString();
    setSearchParams({ page: newPage, limit });
  };

  const openDetails = async (key: number) => {
    navigate({
      pathname: `${DEFAULT_PATH}details/${key}`,
      search: queryParams.toString(),
    });
  };

  const closeDetails = () => {
    navigate({ pathname: DEFAULT_PATH, search: queryParams.toString() });
  };

  return (
    <div className="search-results">
      {isError && <h3 className="nothing-title">Nothing found</h3>}
      {pokemons && !isError && (
        <>
          {"previous" in pokemons && pokemons?.previous ? (
            <button onClick={handlePrev}>&lt;</button>
          ) : (
            <button className="disabled">&lt;</button>
          )}
          {isLoading ? (
            <Loader big={true} />
          ) : (
            <div
              className="search-results__container"
              onClick={isShowingDetails ? closeDetails : undefined}
            >
              {"results" in pokemons &&
                pokemons?.results.map((pokemon) => {
                  const id = Number(pokemon.url.split("/").slice(-2, -1)[0]);
                  if (pokemon)
                    return (
                      <PokemonCard2
                        key={id}
                        id={id}
                        onPress={() => openDetails(id)}
                      />
                    );
                })}
              {!("results" in pokemons) && !("id" in pokemons) && (
                <h3>Nothing found</h3>
              )}
              {"id" in pokemons && (
                <PokemonCard2
                  key={pokemons.id}
                  id={pokemons.id}
                  onPress={() => openDetails(pokemons.id)}
                />
              )}
            </div>
          )}

          {"next" in pokemons && pokemons?.next ? (
            <button onClick={handleNext}>&gt;</button>
          ) : (
            <button className="disabled">&gt;</button>
          )}
        </>
      )}
    </div>
  );
}
