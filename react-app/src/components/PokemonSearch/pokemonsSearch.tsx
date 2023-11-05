import { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import "./PokemonSearch.css";
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

  useEffect(() => {
    console.log("useEffect");
    console.log(location);
  }, [location]);

  const handleSearch = (name: string) => {
    queryParams.set("search", name);
    navigate({ search: queryParams.toString() });
    localStorage.setItem("search", name);
  };

  const setItemsAmount = (amount: number) => {
    console.log(amount);
  };

  return (
    <>
      <SearchBar
        search={handleSearch}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <div className="amout-control">
        {navigation.state === "loading" ? (
          <button className="abount-btn inactive">10</button>
        ) : (
          <button className="abount-btn" onClick={() => setItemsAmount(10)}>
            10
          </button>
        )}
        {navigation.state === "loading" ? (
          <button className="abount-btn inactive">20</button>
        ) : (
          <button className="abount-btn" onClick={() => setItemsAmount(20)}>
            20
          </button>
        )}
        {navigation.state === "loading" ? (
          <button className="abount-btn inactive">50</button>
        ) : (
          <button className="abount-btn" onClick={() => setItemsAmount(50)}>
            50
          </button>
        )}
      </div>
      {navigation.state === "loading" && <Loader />}
      {!(navigation.state === "loading") && <Outlet />}
    </>
  );
}
