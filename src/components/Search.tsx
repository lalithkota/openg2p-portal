import {useTranslations} from "next-intl";

export default function Search() {
  const t = useTranslations();
  return (
    <form className="w-3/4 border print:hidden border-gray-400 rounded-lg flex items-center">
      <input
        type="search"
        id="default-search"
        className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 pl-10 w-full" // Added padding to the right
        placeholder={t("Search")}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0.75rem center", // Adjust as necessary for icon position
          backgroundSize: "1rem", // Adjust as necessary for icon size
          paddingLeft: "2rem",
        }}
      />
    </form>
  );
}
