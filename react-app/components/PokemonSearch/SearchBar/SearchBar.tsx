import { useRef } from 'react';
import styles from './searchBar.module.scss';
import router from 'next/router';
import { SearchResultsProps } from '../../../types/types';

export default function SearchBar({ url, limit }: Partial<SearchResultsProps>) {
  const searchFild = useRef<HTMLInputElement>(null);
  const path = url ? url.split('?')[0] : '/';

  const handleSearch = (value: string) => {
    router.push(`${path}?page=1&limit=${limit}&search=${value}`);
  };

  return (
    <div className={styles.search__bar}>
      <input
        type="text"
        className={styles.search__input}
        id="search"
        ref={searchFild}
      />
      <button
        className="search__button"
        onClick={() => handleSearch(searchFild.current?.value || '')}
      >
        Search
      </button>
    </div>
  );
}
