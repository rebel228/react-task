import styles from './searchResults.module.scss';
import { DEFAULT_PATH } from '../../constants';
import { pokemonAPI } from '../../../services/PokemonService';
import PokemonCard from '../PokemonCard/PokemonCard';
import Loader from '../../Loader/Loader';
import { SearchResultsProps } from '../../../types/types';
import router from 'next/router';

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
  const isShowingDetails = url.includes('/details');
  const path = url.split('?')[0];
  const searchString = search ? `&search=${search}` : '';

  const closeDetails = () => {
    router.push(`${DEFAULT_PATH}?page=${page}&limit=${limit}${searchString}`);
  };

  const openDetails = (id: string) => {
    router.push(
      `${DEFAULT_PATH}details/${id}?page=${page}&limit=${limit}${searchString}`
    );
  };

  const handlePrev = () => {
    router.push(
      `${path}?page=${Number(page) - 1}&limit=${limit}${searchString}`
    );
  };

  const handleNext = () => {
    router.push(
      `${path}?page=${Number(page) + 1}&limit=${limit}${searchString}`
    );
  };

  return (
    <div className={styles.search__results}>
      {isError && <h3 className={styles.nothing__title}>Nothing found</h3>}
      {pokemons && !isError && (
        <>
          <button
            className={`${
              'previous' in pokemons && pokemons?.previous ? '' : 'disabled'
            }`}
            onClick={handlePrev}
          >
            &lt;
          </button>
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
                      <PokemonCard
                        id={id}
                        key={id}
                        onPress={
                          isShowingDetails
                            ? undefined
                            : () => openDetails(id.toString())
                        }
                      />
                    );
                })}
              {!('results' in pokemons) && !('id' in pokemons) && (
                <h3>Nothing found</h3>
              )}
              {'id' in pokemons && (
                <PokemonCard
                  id={pokemons.id}
                  key={pokemons.id}
                  onPress={
                    isShowingDetails
                      ? undefined
                      : () => openDetails(pokemons.id.toString())
                  }
                />
              )}
            </div>
          )}

          <button
            className={`${
              'next' in pokemons && pokemons?.next ? '' : 'disabled'
            }`}
            onClick={handleNext}
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
}
