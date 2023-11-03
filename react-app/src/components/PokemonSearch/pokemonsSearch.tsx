import { useEffect, useState } from "react";
import SearchResults from "./searchResults";
import SearchBar from "./searchBar";
import getPokemonDataByName from "../Api/getPokemonByName";
import "./PokemonSearch.css";
import Loader from "../Loader/Loader";
import { PokemonCardData } from "../../types";

export default function PokemonsSearch() {
  const initialPokemons: (PokemonCardData | undefined)[] = [];
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedInputValue = localStorage.getItem("search");
    if (savedInputValue) {
      setInputValue(savedInputValue);
      handleSearch(inputValue);
    } else handleSearch("");
  }, [inputValue, setInputValue]);

  const handleSearch = (name: string) => {
    setLoading(true);
    getPokemonDataByName(name).then((data) => {
      setPokemons(data.filter((pokemon) => pokemon !== undefined));
      setLoading(false);
    });

    localStorage.setItem("search", name);
  };

  if (loading) {
    return (
      <>
        <SearchBar
          search={handleSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <Loader />
      </>
    );
  } else
    return (
      <>
        <SearchBar
          search={handleSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <SearchResults pokemons={pokemons} />
      </>
    );
}
