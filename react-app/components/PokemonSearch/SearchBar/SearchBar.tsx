import { useRef } from 'react';
import ErrorButton from '../../ErrorButton/ErrorButton';
import styles from './searchBar.module.scss';

export default function SearchBar() {
  const searchFild = useRef<HTMLInputElement>(null);

  //const handleSearch = (value: string) => {};

  return (
    <div className={styles.search__bar}>
      <input
        type="text"
        className={styles.search__input}
        id="search"
        ref={searchFild}
      />
      <button className="search__button">Search</button>
      <ErrorButton />
    </div>
  );
}
