import { useSearchParams } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./SearchControls.scss";

export default function SearchControls() {
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (name: string) => {
    setSearchParams({ search: name, offset: "0" });
    localStorage.setItem("search", name);
  };

  const setItemsAmount = (amount: number) => {
    setSearchParams({ limit: amount.toString(), offset: "0" });
  };

  return (
    <div className="search-contols">
      <SearchBar search={handleSearch} />
      <div className="amount-control">
        <span className="pagenumber-text">{`Page: `}</span>
        {[10, 20, 50].map((perPage) => (
          <button
            key={perPage}
            className="abount-btn"
            onClick={() => setItemsAmount(perPage)}
          >
            {perPage}
          </button>
        ))}
      </div>
    </div>
  );
}
