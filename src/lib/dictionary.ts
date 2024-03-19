import type {Locale} from "@/i18n.config";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  tl: () => import("@/dictionaries/tl.json").then((module) => module.default),
};
//export const getDictionary = async (locale: Locale) => dictionaries[locale]()
export const getDictionary = async (locale: Locale) => {
  if (locale === "en") {
    return dictionaries.en();
  } else if (locale === "fr") {
    return dictionaries.fr();
  } else if (locale === "tl") {
    return dictionaries.tl();
  }
};
