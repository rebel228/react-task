import { PokemonClient, NamedAPIResourceList } from "pokenode-ts";
import { PokemonCardData } from "../../types";

const api = new PokemonClient();

export default async function getPokemonDataByName(
  name: string,
): Promise<(PokemonCardData | undefined)[]> {
  if (name) {
    const data = await getPokemonByName(name);
    return [data];
  } else return await getPokemonList();
}

async function getPokemonByName(
  name: string,
): Promise<PokemonCardData | undefined> {
  const response = await api
    .getPokemonByName(name)
    .then((data) => data)
    .catch((error) => console.log(error));

  if (!response) return;

  const result = await api
    .getPokemonSpeciesByName(response.name)
    .then((data) => data)
    .catch((error) => console.log(error));

  if (!result) return;

  const descr = result.flavor_text_entries.filter(
    (entry) => entry.language.name === "en",
  );

  return {
    name: response.name,
    key: response.id,
    imgUrl: response.sprites.front_default,
    descr: descr[0].flavor_text,
  };
}

async function getPokemonList(): Promise<(PokemonCardData | undefined)[]> {
  const response: NamedAPIResourceList | void = await api
    .listPokemons()
    .then((data) => data)
    .catch((error) => console.log(error));

  const promises: Promise<PokemonCardData | undefined>[] = [];

  if (!response) return [];

  for (const pokemon of response.results) {
    const promise = getPokemonByName(pokemon.name);
    promises.push(promise);
  }

  return Promise.all(promises);
}
