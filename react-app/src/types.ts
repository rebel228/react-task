export type PokemonCardData = {
  name: string;
  key: number;
  imgUrl: string | null;
  descr: string;
};

export interface PokemonElementProps {
  pokemons: PokemonCardData[];
}

export type SearchBarProps = {
  search: (name: string) => void;
};

export type SearchBarData = {
  inputValue: string;
};
