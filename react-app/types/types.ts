export interface SearchBarData {
  inputValue: string;
}

export interface QueryParams {
  search: string | null;
  limit: string;
  page: string;
}

export interface SearchControlsProps {
  url: string;
  search: string;
  page: string;
}

export interface SearchResultsProps extends SearchControlsProps {
  limit: string;
}

export interface PokemonDetailsProps {
  id: string;
  search: string;
  page: string;
  limit: string;
}

export interface FullProps extends SearchControlsProps, PokemonDetailsProps {}
