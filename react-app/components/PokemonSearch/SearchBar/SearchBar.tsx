import { useRef } from 'react';
import ErrorButton from '../../ErrorButton/ErrorButton';
import styles from './searchBar.module.scss';
import { useAppDispatch } from '../../../hooks/redux';
import { searchSlice } from '../../../store/reducers/searchSlice';

export default function SearchBar() {
  const searchFild = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { setSearchString } = searchSlice.actions;

  // useEffect(() => {
  //   if (searchFild.current) searchFild.current.value = searchString;
  // });

  const handleSearch = (value: string) => {
    //setSearchParams({ search: value, page: '1' });
    localStorage.setItem('search', value);
    dispatch(setSearchString({ searchString: value }));
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
        onClick={() =>
          handleSearch(
            searchFild.current?.value ? searchFild.current.value : ''
          )
        }
      >
        Search
      </button>
      <ErrorButton />
    </div>
  );
}
