import { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import "./PokemonSearch.scss";
import Loader from "../Loader/Loader";
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";

export default function PokemonsSearch() {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem("search") || "",
  );

  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const queryParams = new URLSearchParams(location.search);

  const handleSearch = (name: string) => {
    queryParams.set("search", name);
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
    return offset / limit + 1 || 1;
  };

  return (
    <>
      <div className="search-contols">
        <SearchBar
          search={handleSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
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
      {!(navigation.state === "loading") && <Outlet />}
    </>
  );
}
