export interface SearchBarData {
  inputValue: string;
}

export interface QueryParams {
  search: string | null;
  limit: string;
  page: string;
}

export interface SearchResultsProps {
  url: string;
  search: string | null;
  page: string;
  limit: string;
}

export interface PokemonDetailsProps {
  id: string;
  search: string | null;
  page: string;
  limit: string;
}

export interface FullProps extends SearchResultsProps, PokemonDetailsProps {}
