import SearchControls from '../components/PokemonSearch/SearchControls/SearchColtrols';
import SearchResults from '../components/PokemonSearch/SearchResults/SearchResults';
import { wrapper } from '../store/store';
import { pokemonAPI } from '../services/PokemonService';
import { DEFAULT_LIMIT } from '../components/constants';
import { querySlice } from '../store/reducers/queryParamsSlice';
import { SearchResultsProps } from '../types/types';

export default function Home({ url, page, search, limit }: SearchResultsProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <SearchControls url={url} page={page} search={search} limit={limit} />
      <SearchResults url={url} page={page} search={search} limit={limit} />
    </main>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { setQueryParams } = querySlice.actions;
    const url = context.resolvedUrl;
    const id = context.params?.id || null;
    const page = !context.query.page
      ? '1'
      : typeof context.query.page === 'string'
      ? context.query.page
      : context.query.page[0];
    const limit = !context.query.limit
      ? DEFAULT_LIMIT
      : typeof context.query.limit === 'string'
      ? context.query.limit
      : context.query.limit[0];
    const search = !context.query.search
      ? null
      : typeof context.query.search === 'string'
      ? context.query.search
      : context.query.search[0];
    const offset = ((Number(page) - 1) * Number(limit)).toString();

    store.dispatch(
      setQueryParams({
        search,
        limit,
        page,
      })
    );

    const response = search
      ? await store.dispatch(
          pokemonAPI.endpoints.getPokemonByName.initiate(search)
        )
      : await store.dispatch(
          pokemonAPI.endpoints.listPokemons.initiate({ limit, offset })
        );

    const pokemons = response.data || null;
    await Promise.all(store.dispatch(pokemonAPI.util.getRunningQueriesThunk()));
    return { props: { pokemons, url, page, search, limit, id } };
  }
);
