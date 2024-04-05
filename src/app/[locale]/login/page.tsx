import Link from "next/link";
import {useTranslations, useLocale} from "next-intl";
import {AuthUtil} from "@/components/auth";
import LoginBox from "./loginbox";

export default function Login() {
  const lang = useLocale();
  const t = useTranslations();
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between p-7"
      style={{backgroundColor: "#f4f7ff"}}
    >
      <AuthUtil successRedirectUrl={`/${lang}/home`} />
      <LoginBox />
      <div className="border-0">
        <div className="login-bottom-text text-center mt-4">
          {t("Facing any challenges?") + " "}
          <Link href="#" className="text-blue-500">
            {t("Help")}
          </Link>
        </div>
      </div>
    </div>
  );
}
