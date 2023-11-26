import { inter } from '..';
import PokemonDetails from '../../components/PokemonSearch/PokemonDetails/PokemonDetails';
import SearchControls from '../../components/PokemonSearch/SearchControls/SearchColtrols';
import SearchResults from '../../components/PokemonSearch/SearchResults/SearchResults';
import { wrapper } from '../../store/store';
import styles from './Details.module.scss';

export default function Details({ url, id }: { url: string; id: string }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <SearchControls url={url} />
      <div className={styles.container}>
        <SearchResults url={url} />
        <PokemonDetails id={id} />
      </div>
    </main>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    const url = context.resolvedUrl;
    const id = context.params?.id;
    return { props: { url, id } };
  }
);
