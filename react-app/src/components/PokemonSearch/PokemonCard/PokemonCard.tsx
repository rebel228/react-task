import { pokemonAPI } from "../../../services/PokemonService";
import Loader from "../../Loader/Loader";
import { cleanDescription, upperFirstLetter } from "../utils";
import "./PokemonCard.scss";

interface PokemonCardProps {
  onPress?: () => void;
  id: number;
}

export default function PokemonCard(props: PokemonCardProps) {
  const { data: pokemon, isLoading: loadPokemon } =
    pokemonAPI.useGetPokemonByNameQuery(props.id.toString());

  const { data: species, isLoading: loadSpecies } =
    pokemonAPI.useGetSpeciesByNameQuery(props.id.toString());

  return (
    <>
      <div
        className={loadPokemon || loadSpecies ? "pokemon" : "pokemon active"}
        onClick={loadPokemon || loadSpecies ? undefined : props.onPress}
      >
        {(loadPokemon || loadSpecies) && <Loader />}
        {pokemon && species && (
          <>
            <h3 className="pokemon__title">{upperFirstLetter(pokemon.name)}</h3>
            <img
              src={
                pokemon.sprites.front_default
                  ? pokemon.sprites.front_default
                  : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"
              }
              alt={"Image of" + pokemon.name}
              className="pokemon__img"
            />
            <p className="pokemon__text">
              {cleanDescription(
                species.flavor_text_entries.filter(
                  (entry) => entry.language.name === "en",
                )[0].flavor_text,
              )}
            </p>
          </>
        )}
      </div>
    </>
  );
}
