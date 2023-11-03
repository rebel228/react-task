import { useState } from "react";

export default function ErrorButton() {
  const [error, setError] = useState(false);

  function throwError() {
    setError(true);
  }
  if (error) throw new Error("crazy error");
  return (
    <button className="error__button" onClick={throwError}>
      Error
    </button>
  );
}
