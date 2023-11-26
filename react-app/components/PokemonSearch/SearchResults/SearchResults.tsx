import styles from './searchResults.module.scss';
import { DEFAULT_PATH } from '../../constants';
import { pokemonAPI } from '../../../services/PokemonService';
import PokemonCard from '../PokemonCard/PokemonCard';
import Loader from '../../Loader/Loader';
import Link from 'next/link';
import { SearchResultsProps } from '../../../types/types';

export default function SearchResults({
  url,
  search,
  page,
  limit,
}: SearchResultsProps) {
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

  const path = url.split('?')[0];
  const searchString = search ? `&search=${search}` : '';

  return (
    <div className={styles.search__results}>
      {isError && <h3 className={styles.nothing__title}>Nothing found</h3>}
      {pokemons && !isError && (
        <>
          <Link
            className={`${
              'previous' in pokemons && pokemons?.previous ? '' : 'disabled'
            }`}
            href={`${path}?page=${
              Number(page) - 1
            }&limit=${limit}${searchString}`}
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
            <div className={styles.results__container}>
              {'results' in pokemons &&
                pokemons?.results.map((pokemon) => {
                  const id = Number(pokemon.url.split('/').slice(-2, -1)[0]);
                  if (pokemon)
                    return (
                      <Link
                        href={`${DEFAULT_PATH}details/${id}?page=${page}&limit=${limit}${searchString}`}
                        key={id}
                      >
                        <PokemonCard id={id} />
                      </Link>
                    );
                })}
              {!('results' in pokemons) && !('id' in pokemons) && (
                <h3>Nothing found</h3>
              )}
              {'id' in pokemons && (
                <Link
                  href={`${DEFAULT_PATH}/details/${pokemons.id}?page=${page}&limit=${limit}${searchString}`}
                  key={pokemons.id}
                >
                  <PokemonCard id={pokemons.id} />
                </Link>
              )}
            </div>
          )}

          <Link
            className={`${
              'next' in pokemons && pokemons?.next ? '' : 'disabled'
            }`}
            href={`${path}?page=${
              Number(page) + 1
            }&limit=${limit}${searchString}`}
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
