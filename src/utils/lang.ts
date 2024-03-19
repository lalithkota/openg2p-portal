import {getCookie, setCookie} from "cookies-next";

export function getLanguageCookieName() {
  return process.env.NEXT_PUBLIC_LANGUAGE_COOKIE_NAME || "language";
}

export function getSupportedLocales() {
  // TODO: Find better way to do this
  const localesStr = process.env.NEXT_PUBLIC_LANGUAGES_SUPPORTED || "en fr tl";
  return localesStr.split(/\s+/);
}

export function getDefaultLocale() {
  return process.env.NEXT_PUBLIC_LANGUAGE_DEFAULT || "en";
}

export function getCurrentLocale() {
  const options = typeof window === "undefined" ? {cookies: require("next/headers").cookies} : {};
  return getCookie(getLanguageCookieName(), options) || getDefaultLocale();
}

export function setCurrentLocale(locale: string) {
  setCookie(getLanguageCookieName(), locale);
}

export function loadTranslations(locale: string) {
  // TODO: Do client side and server side differently
  return require(`../../messages/${locale}.json`);
}
