import styles from './pokemonDetails.module.scss';
import { upperFirstLetter } from '../utils';
import { pokemonAPI } from '../../../services/PokemonService';
import Loader from '../../Loader/Loader';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_PATH } from '../../constants';
import { PokemonDetailsProps } from '../../../types/types';

export default function PokemonDetails({
  id,
  page,
  limit,
  search,
}: PokemonDetailsProps) {
  const { data: pokemon, isLoading } = pokemonAPI.useGetPokemonByNameQuery(id);
  const searchString = search ? `&search=${search}` : '';

  return (
    <div className={styles.section__details}>
      {isLoading && <Loader />}
      {pokemon && (
        <div className={styles.pokemon__details}>
          <Link
            href={`${DEFAULT_PATH}?page=${page}&limit=${limit}${searchString}`}
          >
            <div className={styles.closebtn} data-testid={'close'}></div>
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
