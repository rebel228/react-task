import Link from 'next/link';
import SearchBar from '../SearchBar/SearchBar';
import styles from './SearchControls.module.scss';
import { SearchResultsProps } from '../../../types/types';

export default function SearchControls({
  url,
  search,
  page,
  limit,
}: SearchResultsProps) {
  const path = url.split('?')[0];
  const searchString = search ? `&search=${search}` : '';

  return (
    <div className={styles.search__contols}>
      <SearchBar url={url} limit={limit} />
      <div className={styles.controls__amount}>
        <span className="pagenumber-text">{`Page: ${page}`}</span>
        {[10, 20, 50].map((perPage) => (
          <Link
            href={`${path}?page=${page}&limit=${perPage}${searchString}`}
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
