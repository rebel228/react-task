import { useNavigate, Outlet, useMatch } from "react-router-dom";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./searchResults.scss";
import { DEFAULT_PATH } from "../../../main";
import { useContext } from "react";
import { PokemonSearchContext } from "../Context/Context";

export default function SearchResults() {
  const { pokemons } = useContext(PokemonSearchContext);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const isShowingDetails = useMatch("details/:id");

  const handlePrev = () => {
    if (!pokemons?.prev) return;
    const params = getQuerryParamsFromUrl(pokemons.prev);
    if (!params.offset || !params.limit) return;
    queryParams.set("offset", params.offset);
    queryParams.set("limit", params.limit);
    navigate({ search: queryParams.toString() });
  };

  const handleNext = () => {
    if (!pokemons?.next) return;
    const params = getQuerryParamsFromUrl(pokemons.next);
    if (!params.offset || !params.limit) return;
    queryParams.set("offset", params.offset);
    queryParams.set("limit", params.limit);
    navigate({ search: queryParams.toString() });
  };

  const openDetails = (key: number) => {
    navigate({
      pathname: `${DEFAULT_PATH}details/${key}`,
      search: queryParams.toString(),
    });
  };

  const closeDetails = () => {
    navigate({ pathname: DEFAULT_PATH, search: queryParams.toString() });
  };

  const getQuerryParamsFromUrl = (url: string) => {
    const params = new URLSearchParams(url.split("?")[1]);
    const limit = params.get("limit");
    const offset = params.get("offset");

    return { offset: offset, limit: limit };
  };

  return (
    <div className="pokemon-section">
      <div className="search-results">
        {pokemons?.prev ? (
          <button onClick={handlePrev}>&lt;</button>
        ) : (
          <button className="disabled">&lt;</button>
        )}
        <div
          className="search-results__container"
          onClick={isShowingDetails ? closeDetails : undefined}
        >
          {pokemons?.data.map((pokemon) => {
            if (pokemon)
              return (
                <PokemonCard
                  key={pokemon.key}
                  name={pokemon.name}
                  imgUrl={pokemon.imgUrl}
                  descr={pokemon.descr}
                  onPress={() => openDetails(pokemon.key)}
                />
              );
          })}
          {pokemons?.data.every((pokemon) => !pokemon) && (
            <h3>Nothing found</h3>
          )}
        </div>
        {pokemons?.next ? (
          <button onClick={handleNext}>&gt;</button>
        ) : (
          <button className="disabled">&gt;</button>
        )}
      </div>
      <Outlet />
    </div>
  );
}
