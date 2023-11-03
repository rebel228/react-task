import { PokemonCardData } from "../../types";
import PokemonCard from "./pokemonCard";

export default function SearchResults({
  pokemons,
}: {
  pokemons: (PokemonCardData | undefined)[];
}) {
  return (
    <div className="search-results">
      {pokemons.map((pokemon) => {
        if (pokemon)
          return (
            <PokemonCard
              key={pokemon.key}
              name={pokemon.name}
              imgUrl={pokemon.imgUrl}
              descr={pokemon.descr}
            />
          );
      })}
    </div>
  );
}
