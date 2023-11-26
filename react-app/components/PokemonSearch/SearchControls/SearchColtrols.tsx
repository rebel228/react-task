import Link from 'next/link';
import SearchBar from '../SearchBar/SearchBar';
import styles from './SearchControls.module.scss';
import { useAppSelector } from '../../../hooks/redux';

export default function SearchControls({ url }: { url: string }) {
  const { search, page } = useAppSelector((state) => state.queryParamsReducer);

  const setItemsAmount = (amount: number) => {
    const path = url.split('?')[0];
    const searchString = search ? `&search=${search}` : '';
    const newUrl = `${path}?page=${page}&limit=${amount}${searchString}`;
    return newUrl;
  };

  return (
    <div className={styles.search__contols}>
      <SearchBar />
      <div className={styles.controls__amount}>
        <span className="pagenumber-text">{`Page: ${page}`}</span>
        {[10, 20, 50].map((perPage) => (
          <Link
            href={setItemsAmount(perPage)}
            key={perPage}
            className="abount-btn"
          >
            {perPage}
          </Link>
        ))}
      </div>
    </div>
  );
}
