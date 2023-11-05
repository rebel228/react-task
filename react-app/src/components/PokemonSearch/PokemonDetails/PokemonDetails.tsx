import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import "./PokemonDetails.scss";
import getPokemonById from "../../Api/getPokemonById";
import { Pokemon } from "pokenode-ts";
import { upperFirstLetter } from "../utils";

export const pokemonDetailsLoader = async ({ request }: LoaderFunctionArgs) => {
  const queryParams = new URL(request.url).searchParams;
  const pokemodId = queryParams.get("details");
  const pokemon = await getPokemonById(Number(pokemodId));
  console.log(pokemon);
  return { pokemon };
};

export default function PokemonDatails() {
  const { pokemon } = useLoaderData() as { pokemon: Pokemon | undefined };
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const closeDetails = () => {
    queryParams.delete("details");
    navigate({ search: queryParams.toString() });
  };

  return (
    <div className="details-section">
      {pokemon && (
        <div className="pokemon-details">
          <div className="close-btn" onClick={closeDetails}></div>
          <h3 className="pokemon-details__title">
            {upperFirstLetter(pokemon.name)}
          </h3>
          <img
            src={
              pokemon.sprites.front_default
                ? pokemon.sprites.front_default
                : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"
            }
            alt={"Image of" + pokemon.name}
            className="pokemon__img"
          />
          <div className="pokemon__stat">
            <p className="pokemon__stat-name">Height:</p>
            <span className="pokemon__stat-text">{pokemon.height} dm</span>
          </div>
          <div className="pokemon__stat">
            <p className="pokemon__stat-name">Weight:</p>
            <span className="pokemon__stat-text">{pokemon.weight} Hg</span>
          </div>
          <div className="pokemon__stat">
            <p className="pokemon__stat-name">HP:</p>
            <span className="pokemon__stat-text">
              {pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat}
            </span>
          </div>
          <div className="pokemon__stat">
            <p className="pokemon__stat-name">Attack:</p>
            <span className="pokemon__stat-text">
              {
                pokemon.stats.find((stat) => stat.stat.name === "attack")
                  ?.base_stat
              }
            </span>
          </div>
          <div className="pokemon__stat">
            <p className="pokemon__stat-name">Defense:</p>
            <span className="pokemon__stat-text">
              {
                pokemon.stats.find((stat) => stat.stat.name === "defense")
                  ?.base_stat
              }
            </span>
          </div>
          <h3 className="pokemon-details__title">Abilities</h3>
          {pokemon.abilities.map((ability) => {
            if (ability)
              return (
                <p className="pokemon__ability">
                  {upperFirstLetter(ability.ability.name)}
                </p>
              );
          })}
        </div>
      )}
    </div>
  );
}
