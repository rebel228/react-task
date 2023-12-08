import { useRef, useEffect } from "react";
import ErrorButton from "../../ErrorButton/ErrorButton";
import "./searchBar.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useSearchParams } from "react-router-dom";
import { searchSlice } from "../../../store/reducers/searchSlice";

export default function SearchBar() {
  const searchFild = useRef<HTMLInputElement>(null);
  const { searchString } = useAppSelector((state) => state.searchReducer);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { setSearchString } = searchSlice.actions;

  useEffect(() => {
    if (searchFild.current) searchFild.current.value = searchString;
  });

  const handleSearch = (value: string) => {
    setSearchParams({ search: value, page: "1" });
    localStorage.setItem("search", value);
    dispatch(setSearchString({ searchString: value }));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search__input"
        id="search"
        ref={searchFild}
      />
      <button
        className="search__button"
        onClick={() =>
          handleSearch(
            searchFild.current?.value ? searchFild.current.value : "",
          )
        }
      >
        Search
      </button>
      <ErrorButton />
    </div>
  );
}
