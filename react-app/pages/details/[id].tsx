import PokemonDetails from '../../components/PokemonSearch/PokemonDetails/PokemonDetails';
import SearchControls from '../../components/PokemonSearch/SearchControls/SearchColtrols';
import SearchResults from '../../components/PokemonSearch/SearchResults/SearchResults';
import styles from './Details.module.scss';
import { getServerSideProps as serverSide } from '../index';
import { FullProps } from '../../types/types';

export default function Details({ url, page, search, limit, id }: FullProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <SearchControls url={url} page={page} search={search} />

      <div className={styles.container}>
        <SearchResults url={url} page={page} search={search} limit={limit} />
        <PokemonDetails id={id} page={page} search={search} limit={limit} />
      </div>
    </main>
  );
}

export const getServerSideProps = serverSide;
