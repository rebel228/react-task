import { ReactNode, createContext, useState } from "react";
import { PokemonDataResponse } from "../../../types";

export type ContentProviderProps = {
  children: ReactNode;
};

export interface PokemonContextProps {
  pokemons: PokemonDataResponse | undefined;
  setPokemons: (pokemons: PokemonDataResponse) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const PokemonSearchContext = createContext<PokemonContextProps>({
  pokemons: undefined,
  setPokemons: () => {},
  searchValue: "",
  setSearchValue: () => {},
});

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<PokemonDataResponse>();
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("search") || "",
  );

  return (
    <PokemonSearchContext.Provider
      value={{ pokemons, setPokemons, searchValue, setSearchValue }}
    >
      {children}
    </PokemonSearchContext.Provider>
  );
};
