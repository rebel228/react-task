import { PokemonDataResponse } from "../../../types";
import {
  useLoaderData,
  LoaderFunctionArgs,
  useNavigate,
  Outlet,
} from "react-router-dom";
import PokemonCard from "../PokemonCard/PokemonCard";
import getPokemonDataByName from "../../Api/getPokemonByName";
import "./searchResults.scss";
import { DEFAULT_PATH } from "../../../main";

export const pokemonsLoader = async ({ request }: LoaderFunctionArgs) => {
  const queryParams = new URL(request.url).searchParams;
  const search = queryParams.get("search");
  const limit = queryParams.get("limit");
  const offset = queryParams.get("offset");
  const pokemons = await getPokemonDataByName(search || "", offset, limit);
  return { pokemons };
};

export default function SearchResults() {
  const { pokemons } = useLoaderData() as { pokemons: PokemonDataResponse };
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const isShowingDetails = queryParams.has("details");

  const handlePrev = () => {
    if (!pokemons.prev) return;
    const params = getQuerryParamsFromUrl(pokemons.prev);
    if (!params.offset || !params.limit) return;
    queryParams.set("offset", params.offset);
    queryParams.set("limit", params.limit);
    navigate({ search: queryParams.toString() });
  };

  const handleNext = () => {
    if (!pokemons.next) return;
    const params = getQuerryParamsFromUrl(pokemons.next);
    if (!params.offset || !params.limit) return;
    queryParams.set("offset", params.offset);
    queryParams.set("limit", params.limit);
    navigate({ search: queryParams.toString() });
  };

  const openDetails = (key: number) => {
    navigate({
      pathname: `${DEFAULT_PATH}/details/${key}`,
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
      <div
        className="search-results"
        onClick={isShowingDetails ? closeDetails : undefined}
      >
        {pokemons.prev ? (
          <button onClick={handlePrev}>&lt;</button>
        ) : (
          <button className="disabled">&lt;</button>
        )}
        <div className="search-results__container">
          {pokemons.data.map((pokemon) => {
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
        </div>
        {pokemons.next ? (
          <button onClick={handleNext}>&gt;</button>
        ) : (
          <button className="disabled">&gt;</button>
        )}
      </div>
      <Outlet />
    </div>
  );
}
