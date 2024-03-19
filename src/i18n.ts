import {getCurrentLocale, loadTranslations} from "@/utils/lang";

export function useTranslations(locale?: string) {
  // TODO: Expand this

  if (!locale) {
    locale = getCurrentLocale();
  }
  const translations = loadTranslations(locale);
  const t = (term: string) => {
    return translations[term] || term;
  };
  return t;
}
