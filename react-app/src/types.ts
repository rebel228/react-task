export type PokemonResults = {
  name: string;
  id: number;
  imgUrl: string | null;
  descr: string;
};

export type PokemonCardData = {
  name: string;
  key: number;
  imgUrl: string | null;
  descr: string;
};

export type PokemonElementState = {
  pokemons: PokemonResults[];
};

export type SearchBarProps = {
  search: (name: string) => void;
};

export type SearchBarData = {
  inputValue: string;
};
