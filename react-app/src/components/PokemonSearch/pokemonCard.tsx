import { PokemonCardData } from "../../types";

export default function PokemonCard({ name, imgUrl, descr }: PokemonCardData) {
  function upperFirstLetter(string: string): string {
    return string.charAt(0).toLocaleUpperCase() + string.slice(1);
  }

  function cleanDescription(string: string): string {
    return string.replace("\f", " ");
  }

  return (
    <div className="pokemon">
      <h3 className="pokemon__title">{upperFirstLetter(name)}</h3>
      <img
        src={
          imgUrl
            ? imgUrl
            : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"
        }
        alt={"Image of" + name}
        className="pokemon__img"
      />
      <p className="pokemon__text">{cleanDescription(descr)}</p>
    </div>
  );
}
