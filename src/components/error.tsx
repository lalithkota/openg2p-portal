"use client";

import {useEffect} from "react";

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({error, reset}: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-container">
      <p className="error-message">An error occurred </p>
      <button className="error-button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
