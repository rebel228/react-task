import styles from './pokemonDetails.module.scss';

import { upperFirstLetter } from '../utils';
//import { DEFAULT_PATH } from '../../constants';
import { pokemonAPI } from '../../../services/PokemonService';
import Loader from '../../Loader/Loader';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../../../hooks/redux';
import { DEFAULT_PATH } from '../../constants';

export default function PokemonDetails({ id }: { id: string }) {
  const { data: pokemon, isLoading } = pokemonAPI.useGetPokemonByNameQuery(id);
  const { search, limit, page } = useAppSelector(
    (state) => state.queryParamsReducer
  );
  const closeDetails = () => {
    const path = DEFAULT_PATH;
    const searchString = search ? `&search=${search}` : '';
    const newUrl = `${path}?page=${page}&limit=${limit}${searchString}`;
    return newUrl;
  };

  return (
    <div className={styles.section__details}>
      {isLoading && <Loader />}
      {pokemon && (
        <div className={styles.pokemon__details}>
          <Link href={closeDetails()}>
            <div className={styles.closebtn}></div>
          </Link>
          <h3 className={styles.details__title}>
            {upperFirstLetter(pokemon.name)}
          </h3>
          <Image
            src={
              pokemon.sprites.front_default
                ? pokemon.sprites.front_default
                : 'https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image'
            }
            alt={'Image of' + pokemon.name}
            className="pokemon__img"
            width={96}
            height={96}
          />
          <div className={styles.details__stat}>
            <p className="pokemon__stat-name">Height:</p>
            <span className="pokemon__stat-text">{pokemon.height} dm</span>
          </div>
          <div className={styles.details__stat}>
            <p className="pokemon__stat-name">Weight:</p>
            <span className="pokemon__stat-text">{pokemon.weight} Hg</span>
          </div>
          <div className={styles.details__stat}>
            <p className="pokemon__stat-name">HP:</p>
            <span className="pokemon__stat-text">
              {pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat}
            </span>
          </div>
          <div className={styles.details__stat}>
            <p className="pokemon__stat-name">Attack:</p>
            <span className="pokemon__stat-text">
              {
                pokemon.stats.find((stat) => stat.stat.name === 'attack')
                  ?.base_stat
              }
            </span>
          </div>
          <div className={styles.details__stat}>
            <p className="pokemon__stat-name">Defense:</p>
            <span className="pokemon__stat-text">
              {
                pokemon.stats.find((stat) => stat.stat.name === 'defense')
                  ?.base_stat
              }
            </span>
          </div>
          <h3 className={styles.details__title}>Abilities</h3>
          {pokemon.abilities.map((ability, index) => {
            if (ability)
              return (
                <p className={styles.details__ability} key={index}>
                  {upperFirstLetter(ability.ability.name)}
                </p>
              );
          })}
        </div>
      )}
    </div>
  );
}
