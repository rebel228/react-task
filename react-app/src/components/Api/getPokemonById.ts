import { PokemonClient, Pokemon } from "pokenode-ts";

const api = new PokemonClient();

export default async function getPokemonById(
  id: number,
): Promise<Pokemon | undefined> {
  const result = await api
    .getPokemonById(id)
    .then((data) => data)
    .catch((error) => console.log(error));
  if (!result) return;
  return result;
}
