import Link from "next/link";
import {Header, Footer} from "@/components";
import {useTranslations} from "@/i18n";

export default function NotFound() {
  const t = useTranslations();
  return (
    <>
      <Header />
      <h2>{t("There was a problem")}</h2>
      <p>{t("We could not find the page you are looking for")}</p>
      <Link href="/" className="bg-blue-500 text-center">
        {t("Home")}
      </Link>
      <Footer />
    </>
  );
}
