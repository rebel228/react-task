import React from "react";
import { Component, ReactNode, RefObject } from "react";
import SearchResults from "./searchResults";
import SearchBar from "./searchBar";
import getPokemonDataByName from "../Api/getPokemonByName";
import { PokemonElementState } from "../../types";
import "./PokemonSearch.css";
import Loader from "../Loader/Loader";

interface Props {
  children?: ReactNode;
}

export default class PokemonsSearch extends Component {
  searchBarElement: RefObject<SearchBar>;
  constructor(props: Props) {
    super(props);
    this.searchBarElement = React.createRef();
  }
  state: PokemonElementState = {
    pokemons: [],
    loading: false,
  };

  componentDidMount() {
    const inputValue = localStorage.getItem("search");
    if (inputValue && typeof inputValue === "string") {
      this.searchBarElement.current?.setState({ inputValue });
      this.handleSearch(inputValue);
    } else this.handleSearch("");
  }

  handleSearch = (name: string) => {
    this.setState({ loading: true });
    getPokemonDataByName(name).then((data) => {
      this.setState({
        pokemons: data.filter((pokemon) => pokemon !== undefined),
        loading: false,
      });
    });
    localStorage.setItem("search", name);
  };

  render() {
    if (this.state.loading) {
      return (
        <>
          <SearchBar ref={this.searchBarElement} search={this.handleSearch} />
          <Loader />
        </>
      );
    } else
      return (
        <>
          <SearchBar ref={this.searchBarElement} search={this.handleSearch} />
          <SearchResults pokemons={this.state.pokemons} />
        </>
      );
  }
}
