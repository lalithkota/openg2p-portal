"use client";
import {useTranslations} from "next-intl";
import {useEffect} from "react";

export default function Error({error, reset}: {error: Error; reset: () => void}) {
  const t = useTranslations();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-container">
      <p className="error-message">An error occurred.</p>
      <button className="error-button" onClick={reset}>
        {t("Try again")}
      </button>
    </div>
  );
}
