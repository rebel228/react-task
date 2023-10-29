import React from "react";
import { Component, ReactNode, RefObject } from "react";
import SearchResults from "./searchResults";
import SearchBar from "./searchBar";
import getPokemonDataByName from "../Api/getPokemonByName";
import { PokemonElementProps } from "../../types";
import "./PokemonSearch.css";

interface Props {
  children?: ReactNode;
}

export default class PokemonsSearch extends Component {
  searchBarElement: RefObject<SearchBar>;
  constructor(props: Props) {
    super(props);
    this.searchBarElement = React.createRef();
  }
  state: PokemonElementProps = {
    pokemons: [],
  };

  componentDidMount() {
    const inputValue = localStorage.getItem("search");
    if (inputValue && typeof inputValue === "string") {
      this.searchBarElement.current?.setState({ inputValue });
      this.handleSearch(inputValue);
    } else this.handleSearch("");
  }

  handleSearch = (name: string) => {
    getPokemonDataByName(name).then((data) => {
      this.setState({
        pokemons: data.filter((pokemon) => pokemon !== undefined),
      });
    });
    localStorage.setItem("search", name);
  };

  render() {
    return (
      <>
        <SearchBar ref={this.searchBarElement} search={this.handleSearch} />
        <SearchResults pokemons={this.state.pokemons} />
      </>
    );
  }
}
