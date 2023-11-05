import { ChangeEvent, useRef } from "react";
import ErrorButton from "../../ErrorButton/ErrorButton";
import "./searchBar.scss";

export default function SearchBar({
  search,
  inputValue,
  setInputValue,
}: {
  search: (name: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}) {
  const searchFild = useRef<HTMLInputElement>(null);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const lowerCase = event.target.value.toLocaleLowerCase();
    if (lowerCase) setInputValue(lowerCase);
    else setInputValue("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search__input"
        id="search"
        onChange={inputHandler}
        value={inputValue}
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
