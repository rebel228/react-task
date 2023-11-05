import { PokemonCardData } from "../../../types";
import { cleanDescription, upperFirstLetter } from "../utils";
import "./pokemonCard.scss";

interface PokemonCardProps extends PokemonCardData {
  onPress?: () => void;
}

export default function PokemonCard(props: PokemonCardProps) {
  return (
    <div className="pokemon" onClick={props.onPress}>
      <h3 className="pokemon__title">{upperFirstLetter(props.name)}</h3>
      <img
        src={
          props.imgUrl
            ? props.imgUrl
            : "https://placehold.jp/3d4070/ffffff/150x150.png?text=No%20image"
        }
        alt={"Image of" + props.name}
        className="pokemon__img"
      />
      <p className="pokemon__text">{cleanDescription(props.descr)}</p>
    </div>
  );
}
