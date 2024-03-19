"use client";
import {useEffect} from "react";
import {useTranslations} from "@/i18n";

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
