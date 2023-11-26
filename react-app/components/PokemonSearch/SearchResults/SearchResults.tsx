import styles from './searchResults.module.scss';
import { DEFAULT_PATH } from '../../constants';
import { pokemonAPI } from '../../../services/PokemonService';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useAppSelector } from '../../../hooks/redux';
import Loader from '../../Loader/Loader';
import Link from 'next/link';

export default function SearchResults({ url }: { url: string }) {
  const { search, limit, page } = useAppSelector(
    (state) => state.queryParamsReducer
  );
  const offset = ((Number(page) - 1) * Number(limit)).toString();
  const {
    data: pokemons,
    isError,
    isLoading,
  } = search
    ? pokemonAPI.useGetPokemonByNameQuery(search)
    : pokemonAPI.useListPokemonsQuery({
        limit,
        offset,
      });
  const isShowingDetails = url.includes('details/');

  const handlePrev = () => {
    const path = url.split('?')[0];
    const newpage = Number(page) - 1;
    const searchString = search ? `&search=${search}` : '';
    const newUrl = `${path}?page=${newpage}&limit=${limit}${searchString}`;
    return newUrl;
  };

  const handleNext = () => {
    const path = url.split('?')[0];
    const newpage = Number(page) + 1;
    const searchString = search ? `&search=${search}` : '';
    const newUrl = `${path}?page=${newpage}&limit=${limit}${searchString}`;
    return newUrl;
  };

  const openDetails = (key: number) => {
    const path = `/details/${key}`;
    const searchString = search ? `&search=${search}` : '';
    const newUrl = `${path}?page=${page}&limit=${limit}${searchString}`;
    return newUrl;
  };

  const closeDetails = () => {
    return `${DEFAULT_PATH}?page=${page}&limit=${limit}` + search
      ? `&search=${search}`
      : '';
  };

  return (
    <div className={styles.search__results}>
      {isError && <h3 className={styles.nothing__title}>Nothing found</h3>}
      {pokemons && !isError && (
        <>
          <Link
            className={`${
              'previous' in pokemons && pokemons?.previous ? '' : 'disabled'
            }`}
            href={handlePrev()}
          >
            <button
              className={`${
                'previous' in pokemons && pokemons?.previous ? '' : 'disabled'
              }`}
            >
              &lt;
            </button>
          </Link>
          {isLoading ? (
            <Loader big={true} />
          ) : (
            <div
              className={styles.results__container}
              onClick={isShowingDetails ? closeDetails : undefined}
            >
              {'results' in pokemons &&
                pokemons?.results.map((pokemon) => {
                  const id = Number(pokemon.url.split('/').slice(-2, -1)[0]);
                  if (pokemon)
                    return (
                      <Link href={openDetails(id)} key={id}>
                        <PokemonCard id={id} onPress={() => openDetails(id)} />
                      </Link>
                    );
                })}
              {!('results' in pokemons) && !('id' in pokemons) && (
                <h3>Nothing found</h3>
              )}
              {'id' in pokemons && (
                <Link href={openDetails(pokemons.id)} key={pokemons.id}>
                  <PokemonCard
                    id={pokemons.id}
                    onPress={() => openDetails(pokemons.id)}
                  />
                </Link>
              )}
            </div>
          )}

          <Link
            className={`${
              'next' in pokemons && pokemons?.next ? '' : 'disabled'
            }`}
            href={handleNext()}
          >
            <button
              className={`${
                'next' in pokemons && pokemons?.next ? '' : 'disabled'
              }`}
            >
              &gt;
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
