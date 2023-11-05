import { PokemonClient, NamedAPIResourceList, Pokemon } from "pokenode-ts";
import { PokemonCardData, PokemonDataResponse } from "../../types";

const api = new PokemonClient();

export default async function getPokemonDataByName(
  name: string,
  offset?: string | null,
  limit?: string | null,
): Promise<PokemonDataResponse> {
  if (name) {
    const data = await getPokemonByName(name);
    return { data: [data] };
  } else return await getPokemonList(offset, limit);
}

async function getPokemonById(
  id: number,
): Promise<PokemonCardData | undefined> {
  const response = await api
    .getPokemonById(id)
    .then((data) => data)
    .catch((error) => console.log(error));

  if (!response) return;
  return addFlavourData(response);
}

async function getPokemonByName(
  name: string,
): Promise<PokemonCardData | undefined> {
  const response = await api
    .getPokemonByName(name)
    .then((data) => data)
    .catch((error) => console.log(error));

  console.log(response);
  if (!response) return;
  return addFlavourData(response);
}

async function addFlavourData(
  response: Pokemon,
): Promise<PokemonCardData | undefined> {
  const result = await api
    .getPokemonSpeciesByName(response.species.name)
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
    descr: descr[0]?.flavor_text || "",
  };
}

async function getPokemonList(
  offset?: string | null,
  limit?: string | null,
): Promise<PokemonDataResponse> {
  const response: NamedAPIResourceList | void = await api
    .listPokemons(Number(offset), Number(limit))
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
  const promises: Promise<PokemonCardData | undefined>[] = [];

  if (!response) return { data: [] };

  for (const pokemon of response.results) {
    const id = Number(pokemon.url.split("/").slice(-2, -1)[0]);
    const promise = getPokemonById(id);
    promises.push(promise);
  }
  return {
    data: await Promise.all(promises).then((data) => data),
    next: response.next,
    prev: response.previous,
  };
}
