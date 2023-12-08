import { ChangeEvent, useRef, useContext } from "react";
import ErrorButton from "../../ErrorButton/ErrorButton";
import "./searchBar.scss";
import { PokemonSearchContext } from "../Context/Context";

export default function SearchBar({
  search,
}: {
  search: (value: string) => void;
}) {
  const { searchValue, setSearchValue } = useContext(PokemonSearchContext);
  const searchFild = useRef<HTMLInputElement>(null);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const lowerCase = event.target.value.toLocaleLowerCase();
    if (lowerCase) setSearchValue(lowerCase);
    else setSearchValue("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search__input"
        id="search"
        onChange={inputHandler}
        value={searchValue}
        ref={searchFild}
      />
      <button
        className="search__button"
        onClick={() =>
          search(searchFild.current?.value ? searchFild.current.value : "")
        }
      >
        Search
      </button>
      <ErrorButton />
    </div>
  );
}
