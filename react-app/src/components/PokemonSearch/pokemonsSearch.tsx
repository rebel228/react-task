import { useContext, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import "./PokemonSearch.scss";
import Loader from "../Loader/Loader";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import getPokemonDataByName from "../Api/getPokemonByName";
import { PokemonDataResponse } from "../../types";
import { PokemonSearchContext } from "./Context/Context";
import SearchResults from "./SearchResults/SearchResults";

export const pokemonsLoader = async ({ request }: LoaderFunctionArgs) => {
  const queryParams = new URL(request.url).searchParams;
  const search = queryParams.get("search");
  const limit = queryParams.get("limit");
  const offset = queryParams.get("offset");
  const fetchedPokemons = await getPokemonDataByName(
    search || "",
    offset,
    limit,
  );
  return { fetchedPokemons };
};

export default function PokemonsSearch() {
  const { fetchedPokemons } = useLoaderData() as {
    fetchedPokemons: PokemonDataResponse;
  };
  const { pokemons, setPokemons } = useContext(PokemonSearchContext);
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    setPokemons(fetchedPokemons);
    console.log(pokemons);
  });

  const handleSearch = (name: string) => {
    queryParams.set("search", name);
    queryParams.set("offset", "0");
    navigate({ search: queryParams.toString() });
    localStorage.setItem("search", name);
  };

  const setItemsAmount = (amount: number) => {
    queryParams.set("limit", amount.toString());
    queryParams.set("offset", "0");
    navigate({ search: queryParams.toString() });
  };

  const getPage = () => {
    const limit = Number(queryParams.get("limit")) || 20;
    const offset = Number(queryParams.get("offset")) || 0;
    return Math.ceil(offset / limit) + 1 || 1;
  };

  return (
    <>
      <div className="search-contols">
        <SearchBar search={handleSearch} />
        <div className="amount-control">
          <span className="pagenumber-text">{`Page: ${getPage()}`}</span>
          {navigation.state === "loading" ? (
            <button className="abount-btn disabled">10</button>
          ) : (
            <button className="abount-btn" onClick={() => setItemsAmount(10)}>
              10
            </button>
          )}
          {navigation.state === "loading" ? (
            <button className="abount-btn disabled">20</button>
          ) : (
            <button className="abount-btn" onClick={() => setItemsAmount(20)}>
              20
            </button>
          )}
          {navigation.state === "loading" ? (
            <button className="abount-btn disabled">50</button>
          ) : (
            <button className="abount-btn" onClick={() => setItemsAmount(50)}>
              50
            </button>
          )}
        </div>
      </div>

      {navigation.state === "loading" && <Loader />}
      <SearchResults />
    </>
  );
}
