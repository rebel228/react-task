import SearchBar from '../SearchBar/SearchBar';
import styles from './SearchControls.module.scss';

export default function SearchControls() {
  const setItemsAmount = (amount: number) => {
    //setSearchParams({ limit: amount.toString(), offset: '0' });
    console.log(amount);
  };

  return (
    <div className={styles.search__contols}>
      <SearchBar />
      <div className={styles.controls__amount}>
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
