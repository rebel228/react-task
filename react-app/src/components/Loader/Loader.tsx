import "./loader.scss";

export default function Loader(props: { big?: boolean }) {
  return (
    <div className={props.big ? "loader-wrapper big" : "loader-wrapper"}>
      <div className="loader"></div>
    </div>
  );
}
