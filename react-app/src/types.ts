export type PokemonCardData = {
  name: string;
  key: number;
  imgUrl: string | null;
  descr: string;
};

export type PokemonDataResponse = {
  data: (PokemonCardData | undefined)[];
  next?: string | null;
  prev?: string | null;
};

export interface PokemonElementProps {
  pokemons: PokemonCardData[];
}

export interface PokemonElementState extends PokemonElementProps {
  loading: boolean;
}

export type SearchBarProps = {
  search: (name: string) => void;
};

export type SearchBarData = {
  inputValue: string;
};

export interface QueryParams {
  search?: string;
  limit: string;
  page?: string;
}
