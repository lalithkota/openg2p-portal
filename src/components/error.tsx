"use client";
import {useTranslations} from "next-intl";
import {useEffect} from "react";

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({error, reset}: Props) {
  const t = useTranslations();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-container">
      <p className="error-message">{t("An error occurred")}</p>
      <button className="error-button" onClick={reset}>
        {t("Try again")}
      </button>
    </div>
  );
}
