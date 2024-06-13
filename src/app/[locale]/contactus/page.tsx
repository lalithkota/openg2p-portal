"use client";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";

export default function ContactUs() {
  const lang = useLocale();
  const t = useTranslations();
  return (
    <div className=" rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
      <div className="mx-auto max-w-screen-xl" style={{marginLeft: "50px", marginRight: "50px"}}>
        <div className="text-gray-700 text-xl " style={{marginBottom: "20px"}}>
          {t("Contact us")}
        </div>
        <div className="flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl">
          <Link href={`/${lang}/home`} className="flex items-center  text-blue-900">
            {" " + t("Home") + " "}
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <p className="m-0">{t("Contact us")}</p>
        </div>
        <div className="container" style={{marginBottom: "250px"}}>
          <h1
            className="text-3xl font-bold"
            style={{
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              lineHeight: "20px",
              letterSpacing: "0px",
              color: "#333333",
              opacity: 1,
              marginTop: "30px",
            }}
          >
            {t("Contact")} OpenG2P
          </h1>
          <h2>{t("Contact Link")}</h2>
        </div>
      </div>
    </div>
  );
}
